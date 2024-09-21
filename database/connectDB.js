import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("> Already Connected with Mongodb.");
      return true;
    } else {
      const con = await mongoose.connect(
        `mongodb+srv://${process.env.DATABAE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.CLUSTER_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
      );
      console.log("> Connection Successfull to Mongodb.");
      return true;
    }
  } catch (err) {
    console.log("> Mongodb connection faild.");
    throw err;
  }
}
