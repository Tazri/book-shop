import mongoose from "mongoose";
import userSchema from "./schemas/userSchema";
import adminUserSchema from "./schemas/adminUserSchema";

export const UserModel =
  mongoose.models["user"] ?? mongoose.model("user", userSchema);
export const AdminUserModel =
  mongoose.models["adminUser"] ?? mongoose.model("adminUser", adminUserSchema);
