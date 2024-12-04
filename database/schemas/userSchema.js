import { hashPassword } from "@/libs/lib";
import { isValidEmail, isValidName, isValidPassword } from "@/libs/validation";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 16,
      trim: true,
      validate: {
        validator: function (value) {
          const check = isValidName(value);
          return check ? false : true;
        },
        message: () => "Name is invalid.",
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
    },
    secret: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      minLength: 4,
      maxLength: 4,
      default: "0000",
    },
    isOTPValid: {
      type: Boolean,
      default: false,
    },
    otpTry: {
      type: Number,
      default: 0,
    },
    lastTimeOtpSend: {
      type: Date,
      required: true,
    },
    suspended: {
      type: Boolean,
      default: false,
      required: false,
    },
    signInTry: {
      type: Number,
      default: 0,
    },
    lastSignInTry: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default userSchema;
