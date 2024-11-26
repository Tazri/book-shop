import connectDB from "@/database/connectDB";
import { AuthorModel } from "@/database/models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function GET(req, { params }) {
  try {
    const id = params.id;

    await connectDB();
    // check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          msg: `Please provide valid author id. Your id "${id}" is not valid.`,
        },
        { status: 400 }
      );
    }

    // check that id is exist
    const author = await AuthorModel.findById(id, { __v: 0 });

    if (!author) {
      return NextResponse.json(
        { msg: "The author not exist.", id },
        { status: 404 }
      );
    }

    return NextResponse.json({
      msg: "Your author is founded.",
      author,
      id,
    });
  } catch (err) {
    console.log(err.message);

    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}
