import connectDB from "@/database/connectDB";
import { PublisherModel } from "@/database/models";
import { deleteUploadedImage } from "@/libs/cloudinary/deleteUploadedImage";
import { checkAdminAuthentication } from "@/middlewares/backend/checkAdminAuthentication";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    await connectDB();

    // validate authorization
    const authenticationResult = await checkAdminAuthentication(req);

    // check authentcationResult is NextResponse, then return it.
    if (authenticationResult instanceof NextResponse)
      return authenticationResult;

    const validateResult = await validateData(id);

    if (validateResult instanceof NextResponse) return validateResult;

    const deletedPublisher = await PublisherModel.findByIdAndDelete(id);

    if (!deletedPublisher) {
      return NextResponse.json(
        { msg: "Publisher does not exist.", params },
        { status: 404 }
      );
    }

    try {
      await deleteUploadedImage(deletedPublisher?.imgPublicId);
    } catch (err) {
      console.log("Failed to delete image from cloud.");
      console.log(err.message);
    }

    return NextResponse.json(
      { msg: "Publisher delete successfully.", deletedPublisher, params },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);

    return NextResponse.json(
      { msg: "Internal server problem" },
      { status: 500 }
    );
  }
}

/**
 *
 * @param {string} id
 * @returns {NextResponse|Object}
 */
async function validateData(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { msg: "Your id is not valid.", reason: "id is not valid.", id },
        {
          status: 400,
        }
      );
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ msg: "Server side problem" }, { status: 500 });
  }
}
