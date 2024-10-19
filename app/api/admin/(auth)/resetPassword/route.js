import connectDB from "@/database/connectDB";
import { AdminUserModel } from "@/database/models";
import { generateJWTSecret, hashPassword } from "@/libs/lib";
import { isValidPassword } from "@/libs/validation";
import { decode, verify } from "jsonwebtoken";
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
      token: reqJson.token,
      password: reqJson.password,
    };

    // connectDB for varified
    await connectDB();
    const validateResponse = await validate(givenData);

    if (validateResponse) return validateResponse;

    // now reset the password
    const payload = decode(givenData.token);
    const identity = { username: payload.username };

    const newSecret = generateJWTSecret();
    const saltRound = parseInt(process.env.SALT_ROUND || 10);
    const newHashedPassword = await hashPassword(givenData.password, saltRound);
    const updateData = {
      secret: newSecret,
      password: newHashedPassword,
    };

    // update the data
    await AdminUserModel.findOneAndUpdate(identity, { $set: updateData });

    return NextResponse.json(
      {
        msg: "Successfully password changed",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}

async function validate(givenData, secret) {
  try {
    // get the user secret
    const token = givenData.token;
    const newPassword = givenData.password;

    // check password is weak
    const checkPassword = isValidPassword(newPassword);

    if (checkPassword) {
      return NextResponse.json(
        {
          msg: "Your password is too much weak.",
          tips: "Use uppsercase,lowercase,digits and special character in password to make strong. Also your password should be between 8 to 128 characters.",
        },
        { status: 400 }
      );
    }

    const payload = decode(token);

    if (!payload) {
      return NextResponse.json(
        { msg: "Your token is not valid." },
        { status: 400 }
      );
    }

    const username = payload.username;

    const user = await AdminUserModel.findOne({ username });
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { msg: "Provided data is not valid." },
        { status: 400 }
      );
    }

    const secret = user.secret;

    const isVerified = verify(token, secret);

    if (!isVerified) {
      return NextResponse.json(
        { msg: "Provided data is not valid." },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: "Data is not valid." }, { status: 400 });
  }

  return null;
}
