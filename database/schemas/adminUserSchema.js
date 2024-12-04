import { generateJWTSecret, hashPassword } from "@/libs/lib";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidUsername,
} from "@/libs/validation";
import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 16,
      trim: true,
      unique: true,
      validate: {
        validator: function (value) {
          const check = isValidUsername(value);
          return check ? false : true;
        },
        message: () => "Username is invalid.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          const check = isValidEmail(value);
          return check ? false : true;
        },
        message: "Email is invalid.",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const check = isValidPassword(value);
          return check ? false : true;
        },
        message: "Password is weak.",
      },
    },
    role: {
      type: String,
      required: true,
      unique: true,
      enum: ["admin", "moderator"],
    },
    lastTimeLogInTry: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    totalLogInTry: {
      type: Number,
      required: true,
      default: 0,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    secret: {
      type: String,
    },
    lastLogInTime: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    lastTimeResetLinkSend: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true }
);

export default adminUserSchema;
