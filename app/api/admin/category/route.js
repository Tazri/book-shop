import connectDB from "@/database/connectDB";
import { CategoryModel } from "@/database/models";
import { deleteUploadedImage } from "@/libs/cloudinary/deleteUploadedImage";
import { uploadCategoryImgBase64 } from "@/libs/cloudinary/uploaderFunction/uploadCategoryImage";
import { checkAdminAuthentication } from "@/middlewares/backend/checkAdminAuthentication";
import categoryValidationSchema from "@/validation/categoryValidationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function POST(req) {
  try {
    const authenticationResult = await checkAdminAuthentication(req);

    // check authentcationResult is NextResponse, then return it.
    if (authenticationResult instanceof NextResponse)
      return authenticationResult;

    const user = authenticationResult;

    const reqJson = await req.json();

    const validationResponse = validateData(reqJson);

    if (validationResponse) return validationResponse;

    await connectDB();
    // check the name is unique.
    const category = await CategoryModel.findOne(
      { name: reqJson.name },
      { __v: false }
    );

    if (category) {
      return NextResponse.json(
        {
          msg: `The category name '${reqJson.name}' is already exist.Try another name.`,
          category,
        },
        {
          status: 409,
        }
      );
    }

    // upload the file to cloudinary
    const cloudinaryResponse = await uploadCategoryImgBase64(reqJson.img);

    const newCategory = {
      name: reqJson.name,
      description: reqJson.description,
      imgUrl: cloudinaryResponse.url,
      imgPublicId: cloudinaryResponse.public_id,
      totalBooks: 0,
    };

    const categoryObj = new CategoryModel(newCategory);

    const savedCategory = await categoryObj.save();
    const { __v, ...restOfCategoryDteails } = savedCategory.toObject();

    return NextResponse.json(
      {
        msg: "Success to add new category",
        category: restOfCategoryDteails,
      },
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
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function DELETE(req) {
  try {
    const authenticationResult = await checkAdminAuthentication(req);

    // check authentcationResult is NextResponse, then return it.
    if (authenticationResult instanceof NextResponse)
      return authenticationResult;

    const user = authenticationResult;

    let reqJson;
    try {
      reqJson = await req.json();
    } catch (err) {
      return NextResponse.json(
        {
          msg: "Please provide category id to delete.",
        },
        { status: 400 }
      );
    }

    // check it valid id ?
    if (!mongoose.Types.ObjectId.isValid(reqJson)) {
      return NextResponse.json(
        {
          msg: "Please provide valid category id.",
        },
        { status: 400 }
      );
    }

    // find the category
    const deletedItem = await CategoryModel.findByIdAndDelete(reqJson.id);

    if (!deletedItem) {
      return NextResponse.json(
        {
          msg: `Category does not exist. Please provide which category you want to delete`,
        },
        { status: 404 }
      );
    }

    // try to deleted category image
    try {
      await deleteUploadedImage(deletedItem.imgPublicId);
    } catch (err) {
      console.log("> failed to delete image.");
    }

    return NextResponse.json(
      {
        msg: "Successfully delete the item.",
        deletedItem: deletedItem.toObject(),
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

function validateData(data) {
  const validationResult = categoryValidationSchema.strict().safeParse(data);

  if (validationResult.success) return null;

  const errors = validationResult.error.errors;
  console.log(errors);

  return NextResponse.json(
    {
      errorMsg: errors[0].message,
      msg: "Please provide valid data.Try to provide only three key : 'name','description','img'.",
      validateSchema: {
        name: "name must be 1 to 20 character",
        description:
          "description is optional. If you provide description then description should be under 1200 character.",
        img: "Try to provide img in base64 format. Image should be JPEG,JPG,PNG or WEBP format and under 1MB.",
      },
    },
    {
      status: 400,
    }
  );
}
