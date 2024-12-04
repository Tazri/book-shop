import mongoose from "mongoose";
import userSchema from "./schemas/userSchema";
import adminUserSchema from "./schemas/adminUserSchema";
import categorySchema from "./schemas/categorySchema";
import authorSchema from "./schemas/authorSchema";
import publisherSchema from "./schemas/publisherSchema";

export const UserModel =
  mongoose.models["user"] ?? mongoose.model("user", userSchema);
export const AdminUserModel =
  mongoose.models["adminUser"] ?? mongoose.model("adminUser", adminUserSchema);
export const CategoryModel =
  mongoose.models["category"] ?? mongoose.model("category", categorySchema);
export const AuthorModel =
  mongoose.models["author"] ?? mongoose.model("author", authorSchema);
export const PublisherModel =
  mongoose.models["publisher"] ?? mongoose.model("publisher", publisherSchema);
