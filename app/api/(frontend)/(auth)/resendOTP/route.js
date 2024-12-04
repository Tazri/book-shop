import connectDB from "@/database/connectDB";
import { UserModel } from "@/database/models";
import { sendOTP } from "@/emails/sendersFunctions/sendOtp";
import { generateOTP } from "@/libs/lib";
import userSignUpValidationSchema from "@/validation/userSignUpValidationSchema";
import { NextResponse, NextRequest } from "next/server";

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
        { msg: validationErrors[0].message, go: "" },
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
          go: "",
        },
        {
          status: 404,
        }
      );
    }

    // if user exist and email is varified
    if (user.isVarified) {
      return NextResponse.json(
        { msg: "User is already verified.", goto: "/signin" },
        { status: 409 }
      );
    }

    const lastTimeOtpSend = user.lastTimeOtpSend;
    const diffInMili = new Date() - lastTimeOtpSend;
    const diffMinute = diffInMili / (1000 * 60);
    const otpResendTime = parseInt(process.env.OTP_RESEND_TIME ?? 1);

    if (diffMinute < otpResendTime) {
      return NextResponse.json(
        {
          msg: `Please wait ${otpResendTime} minutes before requesting another OTP.`,
          email: email,
          otpResendTimGap: otpResendTime,
          lastTimeOtpSend: lastTimeOtpSend,
        },
        { status: 429 }
      );
    }

    const otp = generateOTP();
    await sendOTP(email, otp, user.name);
    const updateData = {
      lastTimeOtpSend: new Date(),
      otp,
      otpTry: 0,
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
        otpResendTimGap: otpResendTime,
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
