import connectDB from "@/database/connectDB";
import { AuthorModel } from "@/database/models";
import { deleteUploadedImage } from "@/libs/cloudinary/deleteUploadedImage";
import { uploadAuthorImgBase64 } from "@/libs/cloudinary/uploaderFunction/uploadAuthorImage";
import { isValidBase64Image } from "@/libs/validation";
import { checkAdminAuthentication } from "@/middlewares/backend/checkAdminAuthentication";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function PATCH(req, { params }) {
  try {
    // connect the db
    await connectDB();

    // check data
    const id = params?.id;

    const validateResult = await validateData(id, req);

    if (validateResult instanceof NextResponse) return validateResult;

    // validate authorization
    const authenticationResult = await checkAdminAuthentication(req);

    // check authentcationResult is NextResponse, then return it.
    if (authenticationResult instanceof NextResponse)
      return authenticationResult;

    const { author, img } = validateResult;
    const prevImgPublicId = author?.imgPublicId;

    // try to upload
    const imgUploadResult = await uploadImg(img);

    if (imgUploadResult instanceof NextResponse) return imgUploadResult;

    const { imgUrl, imgPublicId } = imgUploadResult;

    author.imgUrl = imgUrl;
    author.imgPublicId = imgPublicId;

    await author.save();

    await deleteImg(prevImgPublicId);

    return NextResponse.json({
      params,
      msg: "Successfully update author img.",
      updatedAuthor: author,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { msg: "server side problem. Sorry for this." },
      { status: 500 }
    );
  }
}

/**
 *
 * @param {string} id
 * @param {NextRequest} req
 * @return {NextResponse|object:{img:string,author:obj}}
 */
async function validateData(id, req) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          msg: "Please make sure your data.",
          validation: getValidationSchemaStr(),
        },
        { status: 400 }
      );
    }

    let json;
    try {
      json = await req.json();
    } catch (err) {
      return NextResponse.json(
        {
          msg: "Please make sure your data is valid.",
          validation: getValidationSchemaStr(),
        },
        { status: 400 }
      );
    }
    const img = json?.img;

    if (!img) {
      return NextResponse.json(
        {
          msg: "Please make sure your data is valid.",
          reason: "you did not provide img field in json.",
          validation: getValidationSchemaStr(),
        },
        { status: 400 }
      );
    }

    const isValidBase64 = isValidBase64Image(img);

    if (!isValidBase64.valid) {
      return NextResponse.json(
        {
          msg: "Please make sure your data is valid. Problem come with img field.",
          reason: isValidBase64.reason,
          validation: getValidationSchemaStr(),
        },
        { status: 400 }
      );
    }

    // get author
    const author = await AuthorModel.findById(id);

    if (!author) {
      return NextResponse.json(
        { msg: "Author does not exist." },
        { status: 404 }
      );
    }

    return { img, author };
  } catch (err) {
    console.log("validating updating img of author,id : " + id, " ");
    console.log(err.message);
    console.log("..................");
    return NextResponse.json(
      { msg: "server side problem. Sorry for this." },
      { status: 500 }
    );
  }
}

async function uploadImg(img) {
  try {
    const uploadResponse = await uploadAuthorImgBase64(img);

    return {
      imgUrl: uploadResponse.url,
      imgPublicId: uploadResponse.public_id,
    };
  } catch (err) {
    console.log("upload failed");
    return NextResponse.json({ msg: "Server side problem." }, { status: 500 });
  }
}

async function deleteImg(publicId) {
  try {
    await deleteUploadedImage(publicId);
  } catch (err) {
    console.log("failed to delete.");
  }
}

function getValidationSchemaStr() {
  return {
    json: {
      img: "Img should be base64 format under 1 mb. Img must be webp, jpg, jpeg, png. Try to upload square size img for best fit.",
    },
    params: {
      id: "Every author has unique '_id' to indentify. Use this id to update author img.",
    },
  };
}
