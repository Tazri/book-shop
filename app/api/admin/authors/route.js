import connectDB from "@/database/connectDB";
import { AuthorModel } from "@/database/models";
import { uploadAuthorImgBase64 } from "@/libs/cloudinary/uploaderFunction/uploadAuthorImage";
import { checkAdminAuthentication } from "@/middlewares/backend/checkAdminAuthentication";
import authorValidationSchema from "@/validation/authorValidationSchema";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function POST(req) {
  try {
    // connect the db
    await connectDB();
    // validate authorization
    const authenticationResult = await checkAdminAuthentication(req);

    // check authentcationResult is NextResponse, then return it.
    if (authenticationResult instanceof NextResponse)
      return authenticationResult;

    // const validate result
    const validateResult = await validateData(req);

    if (validateResult instanceof NextResponse) return validateResult;

    // create new author
    const newAuthor = await createNewAuthor(validateResult);

    if (newAuthor instanceof NextResponse) return NextResponse;

    // try to upload it
    const newAuthorObj = new AuthorModel(newAuthor);
    const dbRes = await newAuthorObj.save();

    return NextResponse.json(
      { msg: "Successfully create author.", author: dbRes },
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
async function createNewAuthor(data) {
  try {
    const { img, ...authorData } = data;

    // try to upload img
    const res = await uploadAuthorImgBase64(img);

    if (!res) {
      return NextResponse.json(
        {
          msg: "Internel server problem.",
        },
        { status: 200 }
      );
    }

    authorData.imgUrl = res.url;
    authorData.imgPublicId = res.public_id;
    return authorData;
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
 * @param {NextResponse | object}
 */
async function validateData(req) {
  try {
    const json = await req.json();

    const filterData = {};

    const fileds = [
      "name",
      "description",
      "img",
      "totalBooks",
      "birthDate",
      "deathDate",
      "otherProperty",
    ];

    for (const field of fileds) {
      if (json[field] !== undefined) {
        filterData[field] = json[field];
      }
    }

    if (Object.keys(filterData).length <= 0) {
      return NextResponse.json(
        {
          msg: "Please provide valid data. You must provide data for a author. please check validate schema to confirm what you miss.",
          errorMsg: "There is no data.",
          validateSchema: getValidateSchema(),
        },
        { status: 400 }
      );
    }

    // now check the filterData
    const validationResult = authorValidationSchema
      .strict()
      .safeParse(filterData);

    if (validationResult.success) return filterData;

    const errors = validationResult.error.errors;
    console.log(errors[0]);
    return NextResponse.json(
      {
        errorMsg: errors[0].message,
        problemField: errors[0].path[0],
        msg: "Please follow the validate schema.",
        validateSchema: getValidateSchema(),
      },
      {
        status: 400,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        msg: "Please provide valid data. You must provide data for a author. please check validate schema to check what you miss.",
        errorMsg: "There is no data.",
        validateSchema: getValidateSchema(),
      },
      { status: 400 }
    );
  }
}

function getValidateSchema() {
  return {
    name: "Author name must be string.Name is must be at least 3 character long.Name must be at most 20 characters long.Name cannot start with and end with a space.Name cannot contain consecutive spaces",
    description:
      "Description is optional.If has then try to provide under 1200 characters.",
    img: "Image must be JPG, JPEG, or WEBP and under 1 MB. Also img format in base 64. Try to provide square for get best.",
    totalBooks: "Total books must be a positive number or 0.",
    birthDate:
      "Please provide datetime in ISO date time format. Or string 'unknown' or 'private'.",
    deathDate:
      "Please provide datetime in ISO date time format. Or string 'unknown' or 'alive'.",
    otherProperty:
      "If you want to other property. Try it with provide object key and value. key must be unique.",
  };
}
