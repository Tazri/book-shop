import { cloudinary } from "../cloudinary";

export async function uploadAuthorImgBase64(base64Img) {
  try {
    const res = await cloudinary.uploader.upload(base64Img, {
      folder: "pageTurner/authors",
    });

    return res;
  } catch (err) {
    console.log("Try to upload author img....");
    console.log(err.message);
    return null;
  }
}
