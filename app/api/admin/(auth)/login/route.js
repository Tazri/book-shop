import connectDB from "@/database/connectDB";
import { AdminUserModel } from "@/database/models";
import { isDiffUnderMin, minToMili } from "@/libs/dateTime";
import { hashPassword } from "@/libs/lib";
import adminUserValidationSchema from "@/validation/adminUserValidationSchema";
import { compare } from "bcrypt";
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
    const givenData = {
      username: reqJson?.username,
      password: reqJson?.password,
    };

    // check data
    const loginDataSchema = adminUserValidationSchema.pick({
      username: true,
      password: true,
    });

    const validateResult = loginDataSchema.safeParse(givenData);

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

    // connect with database
    await connectDB();
    const identity = { username: givenData.username };

    // search user
    const user = await AdminUserModel.findOne(identity);

    if (!user) {
      return NextResponse.json(
        { msg: "Username or Password Incorrect." },
        { status: 401 }
      );
    }

    // is log in with in five minute ?
    const SYSTEM_LOG_IN_TRY_GAP = parseInt(
      process.env.SYSTEM_LOG_IN_TRY_GAP || 5
    );
    const isUnder5min = isDiffUnderMin(
      user.lastTimeLogInTry,
      SYSTEM_LOG_IN_TRY_GAP
    );
    let totalLogInTried = user.totalLogInTry + 1;

    if (isUnder5min) {
      await AdminUserModel.findOneAndUpdate(identity, {
        $set: {
          totalLogInTry: totalLogInTried,
        },
      });

      if (totalLogInTried > 6) {
        return NextResponse.json(
          {
            msg: "Too many request. Please try 5 minute later.",
            lastTimeLogInTry: user.lastTimeLogInTry,
            SYSTEM_LOG_IN_TRY_GAP,
          },
          { status: 429 }
        );
      }
    } else {
      await AdminUserModel.findOneAndUpdate(identity, {
        $set: {
          totalLogInTry: 1,
          lastTimeLogInTry: Date.now(),
        },
      });
    }

    const isPasswordMatch = await compare(givenData.password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { msg: "Username or Password Incorrect." },
        { status: 401 }
      );
    }

    if (user.suspended) {
      return NextResponse.json({ msg: "User is suspended." }, { status: 403 });
    }

    // all matched
    // generate token
    await AdminUserModel.findOneAndUpdate(identity, {
      $set: {
        totalLogInTry: 0,
        lastTimeLogInTry: Date.now(),
      },
    });

    const expireTime = process.env.SYSTEM_LOG_IN_EXPIRE || "1d";
    const token = sign(
      {
        brand: "pageTurner",
        msg: "Please secure this token. not share with other.",
        username: user.username,
      },
      user.secret,
      {
        expiresIn: expireTime,
      }
    );

    const response = NextResponse.json(
      {
        msg: "sign in successfull",
        adminToken: token,
      },
      { status: 200 }
    );

    response.cookies.set("systemToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 1,
      path: "/",
    });

    return response;
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}
