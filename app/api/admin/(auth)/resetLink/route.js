import connectDB from "@/database/connectDB";
import { AdminUserModel } from "@/database/models";
import { sendPasswordResetLink } from "@/emails/sendersFunctions/sendPasswordResetLink";
import { isDiffUnderMin } from "@/libs/dateTime";
import adminUserValidationSchema from "@/validation/adminUserValidationSchema";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function POST(req) {
  try {
    const reqJson = await req.json();

    // validating
    const identity = { email: reqJson.email };
    const validateResponse = validate(identity);

    if (validateResponse) return validateResponse;

    // connect with database and find the user
    await connectDB();

    const user = await AdminUserModel.findOne(identity);

    if (!user) {
      return NextResponse.json({ msg: "Email is not valid" }, { status: 404 });
    }

    // if email found
    const RESETLINK_GAP_TIME = parseInt(process.env.RESETLINK_GAP_TIME || 5);
    const isUnderFiveMin = isDiffUnderMin(
      user.lastTimeResetLinkSend,
      RESETLINK_GAP_TIME
    );

    // request in under 5 min
    if (isUnderFiveMin) {
      return NextResponse.json(
        {
          msg: "Too many request.",
          lastTimeResetLinkSend: user.lastTimeResetLinkSend,
          RESETLINK_GAP_TIME,
        },
        { status: 429 }
      );
    }

    const newLastTimeResetLinkSend = Date.now();
    // update data
    await AdminUserModel.findOneAndUpdate(identity, {
      $set: {
        lastTimeResetLinkSend: newLastTimeResetLinkSend,
      },
    });

    // now generate new reset link
    const token = sign(
      {
        brand: "pageTurner",
        msg: "Please secure this token. not share with other.",
        username: user.username,
      },
      user.secret,
      {
        expiresIn: process.env.RESETLINK_EXPIRE_TIME || "5m",
      }
    );

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    await sendPasswordResetLink(
      user.email,
      `${baseURL}/xyz/admin/resetPassword?token=${token}`
    );

    return NextResponse.json(
      {
        msg: "Success",
        emial: user.email,
        lastTimeResetLinkSend: newLastTimeResetLinkSend,
        RESETLINK_GAP_TIME,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}

function validate(reqJson) {
  // check data
  const emailSchema = adminUserValidationSchema.pick({
    email: true,
  });

  const validateResult = emailSchema.safeParse(reqJson);

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

  return null;
}
