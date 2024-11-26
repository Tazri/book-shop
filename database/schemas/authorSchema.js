import { isValidUrl } from "@/libs/validation";
import authorValidationSchema from "@/validation/authorValidationSchema";
import mongoose from "mongoose";
import mongose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      validate: {
        validator: (val) => {
          const name = authorValidationSchema.shape.name;
          const validationResult = name.safeParse(val);

          if (validationResult.success) {
            return true;
          }
          return false;
        },
        message:
          "Name must be at least 3 characters long.Name must be at most 20 characters long.Name cannot start or end with a space, and cannot contain consecutive spaces.",
      },
    },
    description: {
      type: String,
      maxlength: [1200, "Description must be under 1200 characters long."],
    },
    imgUrl: {
      type: String,
      validate: {
        validator: (val) => isValidUrl(val),
        message: "Please provide valid img url.",
      },
    },
    imgPublicId: {
      type: String,
      required: [true, "Image public id is required."],
    },
    totalBooks: {
      type: Number,
      min: [0, "Total books must be a non-negative number."],
      default: 0,
    },
    birthDate: {
      type: String,
      required: [true, "birthDate is required."],
      validate: {
        validator: (val) => {
          const birthDate = authorValidationSchema.shape.birthDate;
          const validationResult = birthDate.safeParse(val);

          return validationResult.success;
        },
        message:
          "Please provide a valid date in ISO format, or 'unknown' or 'private'.",
      },
    },
    deathDate: {
      type: String,
      required: [true, "deathDate is required."],
      validate: {
        validator: function (value) {
          const validationResult =
            authorValidationSchema.shape.deathDate.safeParse(value);
          return validationResult.success;
        },
        message:
          "Please provide a valid date in ISO format, or 'alive' or 'unknown'.",
      },
    },
    otherProperty: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

export default authorSchema;
