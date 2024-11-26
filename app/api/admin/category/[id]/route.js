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
export async function PATCH(req, { params }) {
  try {
    // connect with db
    await connectDB();
    const id = params.id;

    // check id is valid.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          msg: "Please provide valid category id. Check the category id.",
        },
        { status: 400 }
      );
    }

    // check the id is exist in database
    const category = await CategoryModel.findById(id);

    if (!category) {
      return NextResponse.json(
        {
          msg: `The category you update request for "${id}", is not exist. Make sure your category id.`,
        },
        {
          status: 404,
        }
      );
    }

    const authenticationResult = await checkAdminAuthentication(req);

    // check authentcationResult is NextResponse, then return it.
    if (authenticationResult instanceof NextResponse)
      return authenticationResult;

    // validata data
    const validateResult = await validateData(req);

    if (validateResult instanceof NextResponse) {
      return validateResult;
    }

    const updatedData = {};

    if (validateResult.name) updatedData.name = validateResult.name;
    if (validateResult.description)
      updatedData.description = validateResult.description;
    if (Number.isInteger(validateResult.totalBooks))
      updatedData.totalBooks = validateResult.totalBooks;

    // convert the img into url
    if (validateResult.img) {
      const cloudinaryResponse = await uploadCategoryImgBase64(
        validateResult.img
      );

      const prevPublicId = category.imgPublicId;

      updatedData.imgUrl = cloudinaryResponse.url;
      updatedData.imgPublicId = cloudinaryResponse.public_id;

      // delete prevPublicId
      try {
        await deleteUploadedImage(prevPublicId);
      } catch (err) {
        console.log("error : img delete when category update: ");
        console.log(err.message);
      }
    }

    console.log("update data from server");
    console.log(updatedData);

    if (Object.keys(updatedData).length <= 0) {
      return NextResponse.json(
        {
          errorCode: "not-provide-data",
          msg: "Your are not provide any data to update. Please provide data to update.",
          validateSchema: {
            name: "Name must be 1 to 20 character. Also category name must be unique. Make sure it.",
            description:
              "description is optional. If you provide description then description should be under 1200 character.",
            img: "Try to provide img in base64 format. Image should be JPEG,JPG,PNG or WEBP format and under 1MB.",
          },
        },
        { status: 400 }
      );
    }

    // update data
    const updateCategory = await CategoryModel.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        msg: "Category update successfully.",
        updateCategory,
        oldCategory: category,
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

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse|object}
 */
async function validateData(req) {
  try {
    const reqJson = await req.json();

    const data = {};

    if (reqJson.img) data.img = reqJson.img;
    if (reqJson.name) data.name = reqJson.name;
    if (reqJson.description) data.description = reqJson.description;
    if (Number.isInteger(reqJson.totalBooks))
      data.totalBooks = reqJson.totalBooks;

    const validationResult = categoryValidationSchema
      .partial()
      .safeParse(reqJson);

    if (!validationResult.success) {
      const errors = validationResult.error.errors;

      return NextResponse.json({
        errMsg: errors[0].message,
        msg: "Please provide valid data.Try to provide three key to update : 'name','description','img'.",
        validateSchema: {
          name: "name must be 1 to 20 character",
          description:
            "description is optional. If you provide description then description should be under 1200 character.",
          img: "Try to provide img in base64 format. Image should be JPEG,JPG,PNG or WEBP format and under 1MB.",
        },
      });
    }

    // if success then check the name is already exist ?
    if (data.name) {
      const category = await CategoryModel.findOne({ name: data.name });

      if (category) {
        return NextResponse.json({
          msg: `The category name '${data.name}' that you provide that's already exist. Category name must be unique. please choose the other name.`,
          validateSchema: {
            name: "Name must be 1 to 20 character. Also category name must be unique. Make sure it.",
            description:
              "description is optional. If you provide description then description should be under 1200 character.",
            img: "Try to provide img in base64 format. Image should be JPEG,JPG,PNG or WEBP format and under 1MB.",
          },
        });
      }
    }

    return data;
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({
      msg: "Please provide valid data.Try to provide these key to update : 'name','description','img' and 'totalBooks'",
      validateSchema: {
        name: "name must be 1 to 20 character",
        description:
          "description is optional. If you provide description then description should be under 1200 character.",
        img: "Try to provide img in base64 format. Image should be JPEG,JPG,PNG or WEBP format and under 1MB.",
      },
    });
  }
}
