import connectDB from "@/database/connectDB";
import { PublisherModel } from "@/database/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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
          msg: `Please provide valid id. Your id "${id}" is not valid.`,
        },
        { status: 400 }
      );
    }

    const publisher = await PublisherModel.findById(id, { __v: 0 });

    if (!publisher) {
      return NextResponse.json(
        { msg: "The publisher not exist.", id },
        { status: 404 }
      );
    }

    return NextResponse.json({
      msg: "Publisher is founded.",
      publisher,
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
