import React from "react";
import DisplayImageField from "../shared/display/DisplayImageField";
import defaultImg from "./../../assets/category/history.webp";

function AdmingSingleCategoryImgDisplay({ category, updateButton }) {
  return (
    <>
      <DisplayImageField
        label={"Category Image"}
        info={
          "Take idea of category of image. If you want to update then you can update simple click on update button."
        }
        src={category?.imgUrl ? category.imgUrl : defaultImg}
      />
      <button
        onClick={updateButton}
        className="text-white bg-primary text-lg uppercase w-full max-w-xs my-3 py-1"
      >
        Update Category Image
      </button>
    </>
  );
}

export default AdmingSingleCategoryImgDisplay;
