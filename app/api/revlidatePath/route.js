import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        {
          msg: "You are not provide the path to revlidated it.",
        },
        {
          status: 400,
        }
      );
    }

    revalidatePath(path);
    return NextResponse.json(
      { msg: "Success to revlidated path.", path },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}
