import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} res
 * @returns {NextResponse}
 */
export async function POST(request) {
  return NextResponse.json({ msg: "This is message" }, { status: 200 });
}
