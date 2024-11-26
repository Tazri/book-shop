import { cloudinary } from "./cloudinary";

export async function deleteUploadedImage(public_id) {
  try {
    const res = await cloudinary.uploader.destroy(public_id);

    if (res.result == "ok") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Try to delete img to cloudinary by public id :");
    console.log(err.message);
    return false;
  }
}
