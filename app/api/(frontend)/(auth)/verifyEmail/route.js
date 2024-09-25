import connectDB from "@/database/connectDB";
import { UserModel } from "@/database/models";
import userSignUpValidationSchema from "@/validation/userSignUpValidationSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function POST(req) {
  try {
    const reqData = await req.json();
    const givenOTP = reqData.otp;
    const userEmail = reqData.email;

    const validateResult =
      userSignUpValidationSchema.shape.email.safeParse(userEmail);

    if (!validateResult.success) {
      const validationErrors = validateResult.error.errors;
      return NextResponse.json(
        { msg: validationErrors[0].message },
        { status: 400 }
      );
    }

    // connect with db and find user
    await connectDB();
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        {
          msg: "User is not found.",
        },
        { status: 404 }
      );
    }

    if (user.isVarified) {
      return NextResponse.json(
        {
          msg: "User is already verified.",
          email: userEmail,
        },
        { status: 200 }
      );
    }

    if (!user.isOTPValid) {
      return NextResponse.json(
        {
          msg: "Too many otp verify request. So your current otp code is disabled.",
        },
        {
          status: 429,
        }
      );
    }

    if (user.otp === givenOTP) {
      // verified the user email
      await UserModel.findOneAndUpdate(
        { email: userEmail },
        { $set: { isVarified: true } }
      );

      return NextResponse.json(
        {
          msg: "User is verified now. You can sign in now.",
          email: userEmail,
        },
        {
          status: 200,
        }
      );
    }

    const otpTried = user.otpTry + 1;
    const otpTryLeft = 5 - otpTried;

    if (otpTryLeft > 0) {
      await UserModel.findOneAndUpdate(
        { email: userEmail },
        { $set: { otpTry: otpTried } }
      );

      return NextResponse.json(
        {
          msg: `OTP mismatch. You have ${otpTryLeft} more attempts to enter the correct OTP.`,
        },
        { status: 400 }
      );
    }

    await UserModel.findOneAndUpdate(
      { email: userEmail },
      { $set: { isOTPValid: false, otpTry: 0 } }
    );

    return NextResponse.json(
      {
        msg: "Too many otp verify request. So your current otp code is disabled.",
      },
      {
        status: 429,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "Internal server error." },
      { status: 500 }
    );
  }
}
