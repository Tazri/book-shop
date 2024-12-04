import { cloudinary } from "../cloudinary";

export async function uploadCategoryImgBase64(base64Img) {
  try {
    const result = await cloudinary.uploader.upload(base64Img, {
      folder: "pageTurner/category",
    });

    return result;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
