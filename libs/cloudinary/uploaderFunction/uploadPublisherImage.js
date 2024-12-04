import { cloudinary } from "../cloudinary";

export async function uploadPublisherImgBase64(base64Img) {
  try {
    const result = await cloudinary.uploader.upload(base64Img, {
      folder: "pageTurner/publishers",
    });

    return result;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
