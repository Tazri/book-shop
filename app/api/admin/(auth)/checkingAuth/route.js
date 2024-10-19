import connectDB from "@/database/connectDB";
import { AdminUserModel } from "@/database/models";
import { decode, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function POST(req) {
  try {
    const cookieStore = cookies();
    const systemTokenCookie = cookieStore.get("systemToken");

    if (!systemTokenCookie) {
      return resetCookieResponse("There is no Token.");
    }

    const systemToken = systemTokenCookie.value;

    // try decode
    const decodeData = decode(systemToken);

    // if decode null then reset the cookie
    if (!decodeData || !decodeData.username) {
      return resetCookieResponse("Token is not valid. so remove it.");
    }

    const identity = { username: decodeData.username };

    // connect database
    await connectDB();

    const user = await AdminUserModel.findOne(identity);

    if (!user) {
      return resetCookieResponse("Token is not valid. so remove it.");
    }

    // try verify the token
    try {
      verify(systemToken, user.secret);
    } catch (err) {
      console.log(err.message);
      return resetCookieResponse("Token is not valid. so remove it.");
    }

    // token is verified so go admin
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return NextResponse.json(
      {
        redirectLink: baseUrl + "/xyz/admin",
        msg: "Token is valid.",
      },
      { status: 301 }
    );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}

function resetCookieResponse(msg) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const response = NextResponse.json(
    {
      redirectLink: baseUrl + "/xyz/admin/login",
      msg,
    },
    { status: 301 }
  );

  // To remove the cookie, set Max-Age to 0 or set an expiry date in the past
  response.cookies.set("systemToken", "", { maxAge: 0 }); // Clears the cookie

  return response;
}
