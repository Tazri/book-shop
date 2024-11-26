import connectDB from "@/database/connectDB";
import { AuthorModel } from "@/database/models";
import { checkAdminAuthentication } from "@/middlewares/backend/checkAdminAuthentication";
import authorValidationSchema from "@/validation/authorValidationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 *
 * @param {NextRequest} req
 * @return {NextResponse}
 */
export async function PATCH(req, { params: { id } }) {
  try {
    // connect the db
    await connectDB();
    // validate authorization
    const authenticationResult = await checkAdminAuthentication(req);

    // check authentcationResult is NextResponse, then return it.
    if (authenticationResult instanceof NextResponse)
      return authenticationResult;

    // const validate result
    const validateResult = await validateData(id, req);

    if (validateResult instanceof NextResponse) return validateResult;

    const { author, updateAuthordata } = validateResult;

    const updatedKeys = Object.keys(updateAuthordata);

    for (const key of updatedKeys) {
      author[key] = updateAuthordata[key];
    }

    // save
    await author.save();

    return NextResponse.json(
      {
        msg: "Successfully",
        authorId: id,
        updatedAuthor: author,
        params: { id },
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
 * @param {string} id
 * @param {NextRequest} req
 * @return {NextResponse|{author,updateAuthordata}}
 */
async function validateData(id, req) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          msg: "Your id in params is not valid.",
          reason: "Id is not valid.",
          validateSchema: getValidationSchemaStr(),
        },
        {
          status: 400,
        }
      );
    }

    // search the author
    const author = await AuthorModel.findById(id);

    if (!author) {
      return NextResponse.json(
        {
          msg: "Author does not exist.",
          reason: "Author id does not exist.",
          validateSchema: getValidationSchemaStr(),
        },
        {
          status: 404,
        }
      );
    }

    let json = null;

    try {
      json = await req.json();
    } catch (err) {
      return NextResponse.json(
        {
          msg: "You did not provide any json.",
          reason: "Did not provide nay json.",
          validateSchema: getValidationSchemaStr(),
        },
        { status: 400 }
      );
    }

    const { totalField, updatedAuthorData } = filterData(json);

    if (!totalField) {
      return NextResponse.json(
        {
          msg: "Did not provide any data.",
          reason: "Did not provide any data.",
          validateSchema: getValidationSchemaStr(),
        },
        { status: 400 }
      );
    }

    const updateAuthorValidationSchema = authorValidationSchema
      .omit({ img: true })
      .partial();

    const validationResult =
      updateAuthorValidationSchema.safeParse(updatedAuthorData);

    if (!validationResult.success) {
      const error = validationResult.error.errors[0];

      return NextResponse.json(
        {
          msg: "Data is not valid.",
          reason: { message: error.message, field: error.path[0] },
          validateSchema: getValidationSchemaStr(),
        },
        { status: 400 }
      );
    }

    return { author, updateAuthordata: updatedAuthorData };
  } catch (err) {
    return NextResponse.json(
      {
        msg: "Failed to validate data.",
        validateSchema: getValidationSchemaStr(),
      },
      { status: 400 }
    );
  }
}

/**
 *
 * @param {object} json
 * @returns {{totalField,updatedAuthorData}}
 */
function filterData(json) {
  const allowedKeys = [
    "name",
    "description",
    "totalBooks",
    "birthDate",
    "deathDate",
    "otherProperty",
  ];

  const updatedData = {};

  for (const key of allowedKeys) {
    const value = json[key];
    if (value !== null && value !== undefined) {
      updatedData[key] = value;
    }
  }

  return {
    totalField: Object.keys(updatedData).length,
    updatedAuthorData: updatedData,
  };
}

function getValidationSchemaStr() {
  return {
    params: {
      id: "Every author has unique '_id' to indentify. Use this id to update author img.",
    },
    json: {
      name: "Author name must be string.Name is must be at least 3 character long.Name must be at most 20 characters long.Name cannot start and end with a space.Name cannot contain consecutive spaces",
      description: "Description must be under 1200 characters long.",
      totalBooks: "Total books must be a positive number or 0.",
      birthDate:
        "Please provide datetime in ISO date time format. Or string 'unknown' or 'private'.",
      deathDate:
        "Please provide datetime in ISO date time format. Or string 'unknown' or 'alive'.",
      otherProperty:
        "This is should be object.Key and property must be string.",
    },
  };
}
