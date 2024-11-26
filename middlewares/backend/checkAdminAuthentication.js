import connectDB from "@/database/connectDB";
import { AdminUserModel } from "@/database/models";
import { decode, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 * @param {Function} next
 * @return {NextResponse|null}
 */
export async function checkAdminAuthentication(req, next = nextFunc) {
  try {
    const systemTokenCookie = req.cookies.get("systemToken");

    if (!systemTokenCookie || !systemTokenCookie.value) {
      return removeCookieFromResponse(
        "There is a no cookies. I think you need to log in system again to set cookie."
      );
    }

    const systemToken = systemTokenCookie.value;

    const decoded = decode(systemToken);

    if (!decoded?.username) {
      return removeCookieFromResponse(
        "Your token is invalid. Please create new token."
      );
    }

    const identity = { username: decoded.username };

    // connectDB
    await connectDB();

    const user = await AdminUserModel.findOne(identity);

    if (!user) {
      return removeCookieFromResponse(
        "Your token is invalid. Please create new token."
      );
    }

    // try to verify the token
    try {
      verify(systemToken, user.secret);
    } catch (err) {
      return removeCookieFromResponse(
        "Your token signature is invalid or expired. Please create new token."
      );
    }

    return user;
  } catch (err) {
    console.log(err.message);

    const response = removeCookieFromResponse(
      "Something had problem in server side. sorry for that."
    );

    return response;
  }
}

function nextFunc(errorText) {
  if (errorText) {
    throw new Error(errorText);
  }
  return null;
}

/**
 *
 * @param {NextResponse} res
 * @return {NextResponse}
 */
function removeCookieFromResponse(msg) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = NextResponse.json(
    {
      msg,
      redirectPath: "/xyz/admin/checkingAuth",
      redirectUrl: baseUrl + "/xyz/admin/checkingAuth",
    },
    { status: 401 }
  );

  res.cookies.set("systemToken", "", {
    maxAge: 0,
    path: "/",
  });
  return res;
}
