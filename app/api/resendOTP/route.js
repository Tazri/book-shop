import connectDB from "@/database/connectDB";
import { UserModel } from "@/database/models";
import { sendOTP } from "@/emails/sendersFunctions/sendOtp";
import { generateOTP } from "@/libs/lib";
import userSignUpValidationSchema from "@/validation/userSignUpValidationSchema";
import { NextResponse, NextRequest } from "next/server";
import { isValid } from "zod";

/**
 *
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function POST(req) {
  try {
    const jsonData = await req.json();
    const email = jsonData.email;

    // check email is valid
    const validateResult =
      userSignUpValidationSchema.shape.email.safeParse(email);

    if (!validateResult.success) {
      const validationErrors = validateResult.error.errors;
      return NextResponse.json(
        { msg: validationErrors[0].message },
        { status: 400 }
      );
    }

    // conecct db
    await connectDB();
    // find the user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          msg: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    // if user exist and email is varified
    if (user.isVarified) {
      return NextResponse.json(
        { msg: "User is already verified." },
        { status: 409 }
      );
    }

    const lastTimeOtpSend = user.lastTimeOtpSend;
    const diffInMili = new Date() - lastTimeOtpSend;
    const diffMinute = diffInMili / (1000 * 60);
    const otpResendTime = process.env.OTP_RESEND_TIME ?? 5;

    console.log(diffMinute, otpResendTime);
    if (diffMinute < otpResendTime) {
      return NextResponse.json(
        {
          msg: `Please wait ${otpResendTime} minutes before requesting another OTP.`,
        },
        { status: 429 }
      );
    }

    const otp = generateOTP();
    await sendOTP(email, otp);
    const updateData = {
      lastTimeOtpSend: new Date(),
      otp,
      isOTPValid: true,
    };

    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: updateData,
      }
    );

    return NextResponse.json(
      {
        msg: "OTP is sended.",
        email,
        lastTimeOtpSend: updateData.lastTimeOtpSend,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "Internal server error." },
      { status: 500 }
    );
  }
}
