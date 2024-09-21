import mongoose from "mongoose";
import userSchema from "./schemas/userSchema";

export const UserModel =
  mongoose.models["user"] ?? mongoose.model("user", userSchema);
