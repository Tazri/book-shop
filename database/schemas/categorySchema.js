import { isValidUrl } from "@/libs/validation";
import categoryValidationSchema from "@/validation/categoryValidationSchema";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 20,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => {
          const nameSchema = categoryValidationSchema.shape.name;
          const res = nameSchema.safeParse(value);

          return res.success;
        },
        message: "Please provide valid category name.",
      },
    },
    description: {
      type: String,
      maxLength: 1200,
      default: "",
    },
    imgUrl: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isValidUrl(value),
        message: "Please provide valid img url",
      },
    },
    imgPublicId: {
      type: String,
    },
    totalBooks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default categorySchema;
