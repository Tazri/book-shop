import connectDB from "@/database/connectDB";
import { UserModel } from "@/database/models";
import { isDiffUnderMin } from "@/libs/dateTime";
import userSignUpValidationSchema from "@/validation/userSignUpValidationSchema";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function POST(req) {
  try {
    const reqData = await req.json();

    // validate req data
    const partialSchema = userSignUpValidationSchema.pick({
      email: true,
      password: true,
    });

    const validateResult = partialSchema.safeParse(reqData);

    if (!validateResult.success) {
      const validationErrors = validateResult.error.errors;
      return NextResponse.json(
        { msg: validationErrors[0].message },
        { status: 400 }
      );
    }

    // connect with db and find user
    const userEmail = reqData.email;
    await connectDB();
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ msg: "User is not valid." }, { status: 404 });
    }

    if (!user.isVarified) {
      return NextResponse.json(
        { msg: "User is not verified." },
        { status: 403 }
      );
    }

    const givenPassword = reqData.password;
    const password = user.password;

    // compare the password
    const isMatch = await compare(givenPassword, password);
    const signInTried = user.signInTry + 1;
    const lastSignTime = user.lastSignInTry;

    const isUnder5Min = isDiffUnderMin(lastSignTime, 5);

    if (signInTried > 10 && isUnder5Min) {
      return NextResponse.json(
        {
          msg: "Too many sign in request from this email. Please try 5 minute later.",
          lastSignInTry: user.lastSignInTry,
        },
        { status: 429 }
      );
    }

    if (!isUnder5Min) {
      await UserModel.findOneAndUpdate(
        { email: userEmail },
        { $set: { signInTry: 1, lastSignInTry: Date.now() } }
      );
    } else {
      await UserModel.findOneAndUpdate(
        { email: userEmail },
        { $set: { signInTry: signInTried, lastSignInTry: Date.now() } }
      );
    }

    if (!isMatch) {
      return NextResponse.json(
        {
          msg: "User or password is incorrect.",
        },
        { status: 401 }
      );
    }

    if (user.suspended) {
      return NextResponse.json({ msg: "User is suspended." }, { status: 403 });
    }

    await UserModel.findOneAndUpdate(
      { email: userEmail },
      { $set: { signInTry: 0, lastSignInTry: Date.now() } }
    );

    // create token
    const expireTime = process.env.SIGN_IN_EXPIRE || "5d";
    const token = sign(
      {
        msg: "Please secure this token. not share with other.",
        email: userEmail,
      },
      user.secret,
      {
        expiresIn: expireTime,
      }
    );

    const response = NextResponse.json(
      {
        msg: "sign in successfull",
        token,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 5,
      path: "/",
    });

    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "Internal server error." },
      { status: 500 }
    );
  }
}
