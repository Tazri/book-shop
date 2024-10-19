import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function DELETE() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const response = NextResponse.json(
      {
        redirectLink: baseUrl + "/xyz/admin/login",
        msg: "Success to remove token from cookie.",
      },
      { status: 301 }
    );

    response.cookies.set("systemToken", "", { maxAge: 0 });
    return response;
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}
