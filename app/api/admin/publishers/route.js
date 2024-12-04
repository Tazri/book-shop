import connectDB from "@/database/connectDB";
import { PublisherModel } from "@/database/models";
import { uploadPublisherImgBase64 } from "@/libs/cloudinary/uploaderFunction/uploadPublisherImage";
import { checkAdminAuthentication } from "@/middlewares/backend/checkAdminAuthentication";
import publisherValidationSchema from "@/validation/publisherValidationSchema";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function POST(req) {
  try {
    await connectDB();

    // validate authorization
    const authenticationResult = await checkAdminAuthentication(req);

    // check authentcationResult is NextResponse, then return it.
    if (authenticationResult instanceof NextResponse)
      return authenticationResult;

    // const validate result
    const validateResult = await validateData(req);
    if (validateResult instanceof NextResponse) return validateResult;

    const newPublisher = await createNewPublisher(validateResult);
    if (newPublisher instanceof NextResponse) return newPublisher;

    const publisherObj = new PublisherModel(newPublisher);
    const dbRes = await publisherObj.save();

    return NextResponse.json(
      { msg: "success", publisher: dbRes },
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
 * @param {object} data
 * @return {NextResponse|object}
 */
async function createNewPublisher(data) {
  try {
    const { img, ...publisherData } = data;

    // try to upload img
    const res = await uploadPublisherImgBase64(img);

    if (!res) {
      return NextResponse.json(
        {
          msg: "Internel server problem.",
        },
        { status: 200 }
      );
    }

    publisherData.imgUrl = res.url;
    publisherData.imgPublicId = res.public_id;
    return publisherData;
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
 * @param {NextRequest} req
 * @return {NextResponse|object}
 */
async function validateData(req) {
  try {
    const json = await req.json();
    const filterJson = {};
    const allowedFields = ["name", "description", "img", "totalBooks"];

    for (const field of allowedFields) {
      if (json[field] !== undefined) {
        filterJson[field] = json[field];
      }
    }

    if (Object.keys(filterJson).length <= 0) {
      return NextResponse.json(
        {
          yourData: filterJson,
          msg: "Please provide valid data. You must provide data for a category. please check validate schema to confirm what you miss.",
          reason: "There is no data.",
          validateSchema: getValidationSchema(),
        },
        { status: 400 }
      );
    }

    // now check the filterData
    const validationResult = publisherValidationSchema
      .strict()
      .safeParse(filterJson);

    if (validationResult.success) return filterJson;

    const errors = validationResult.error.errors;

    return NextResponse.json(
      {
        reason: errors[0].message,
        problemField: errors[0].path[0],
        msg: "Please follow the validate schema.",
        validateSchema: getValidationSchema(),
      },
      {
        status: 400,
      }
    );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      {
        msg: "Your data is not valid.",
        reason: "you are not may be provide the data.",
        validationSchema: getValidationSchema(),
      },
      { status: 400 }
    );
  }
}

function getValidationSchema() {
  return {
    name: "Name is must be at least 1 character long.Name must be at most 20 characters long.Name cannot start or end with a space.Name cannot contain consecutive spaces.",
    description:
      "Description is optional but description must be under 1200 characters long",
    img: "Img must be base 64. img mime type must be jpeg, jpg, png, webp etc.",
    totalBooks: "Total books must be a positive number or 0.",
  };
}
