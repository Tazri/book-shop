import connectDB from "@/database/connectDB";
import { UserModel } from "@/database/models";
import { sendOTP } from "@/emails/sendersFunctions/sendOtp";
import { generateJWTSecret, generateOTP, hashPassword } from "@/libs/lib";
import userSignUpValidationSchema from "@/validation/userSignUpValidationSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function POST(req) {
  try {
    const userData = await req.json();

    const validateResult = userSignUpValidationSchema.safeParse(userData);

    /** check data is ok */
    if (!validateResult.success) {
      const validationErrors = validateResult.error.errors;

      return NextResponse.json(
        {
          msg: "Provide valid data",
          validationMessage: validationErrors[0]?.message,
        },
        { status: 400 }
      );
    }

    await connectDB();
    const email = userData?.email;

    // check the email is found or not
    const user = await UserModel.findOne({ email });

    if (user) {
      // update user data
      const partialChange = {
        email: userData.email,
        name: userData.name,
      };

      if (user.isVarified) {
        return NextResponse.json(
          {
            msg: "Email already used. Go sign in.",
          },
          { status: 409 }
        );
      } else if (user.isOTPValid) {
        await UserModel.findOneAndUpdate(
          { email },
          { $set: partialChange },
          {
            runValidators: true,
          }
        );

        return NextResponse.json(
          {
            msg: "Email is not varified. Please veriy the email address. OTP is already sended.",
            email: email,
            lastTimeOtpSend: user.lastTimeOtpSend,
          },
          { status: 200 }
        );
      } else {
        // save partial change
        await UserModel.findOneAndUpdate(
          { email },
          { $set: partialChange },
          {
            runValidators: true,
          }
        );
        // send otp
        const otp = generateOTP();
        await sendOTP(email, otp, partialChange.name);

        // update otp information
        const updateUserData = {};
        updateUserData.lastTimeOtpSend = new Date();
        updateUserData.otp = otp;
        updateUserData.isOTPValid = true;
        await UserModel.findOneAndUpdate({ email }, { $set: updateUserData });

        return NextResponse.json(
          {
            msg: "Email is not varified. Please verify the email address. OTP is sended. Check your email.",
            email: email,
            lastTimeOtpSend: updateUserData.lastTimeOtpSend,
          },
          { status: 200 }
        );
      }
    }

    // create user
    // send new otp
    const otp = generateOTP();
    await sendOTP(email, otp, userData.name);

    //
    const saltRound = parseInt(process.env.SALT_ROUND || 10);
    const hashedPassword = await hashPassword(userData.password, saltRound);
    userData.password = hashedPassword;
    // now set data
    userData.lastTimeOtpSend = new Date();
    userData.otp = otp;
    userData.isOTPValid = true;
    userData.secret = generateJWTSecret();

    const modelObj = new UserModel(userData);
    await modelObj.save();

    return NextResponse.json(
      {
        msg: "OTP is sended. Please verify your email address.",
        email: email,
        lastTimeOtpSend: userData.lastTimeOtpSend,
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
