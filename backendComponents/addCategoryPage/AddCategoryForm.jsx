import Image from "next/image";
import AdminInputField from "../shared/formUi/AdminInputField";
import uploadImgPlaceholderImg from "./../../assets/placeholders/upload-image-placeholder.png";

function AddCategoryForm() {
  return (
    <div className="border p-2 mt-2 flex flex-col gap-3">
      <AdminInputField
        label="Enter new category name."
        info="Please try to enter unique category name."
        placeholder="eg: Suspence, Story, Thriller"
        id="add-category-name"
      />

      <div>
        <label className="text-[#222222]">
          Upload a Image file.<span className="text-primary">*</span>
        </label>
        <p className="text-[#444444] text-xs select-none">
          Please upload a image for your category.
        </p>

        <label
          className="w-72 mt-2 group block cursor-pointer"
          htmlFor="file-upload"
        >
          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept=".jpg,.jpeg,.png"
          />
          <div className="w-full">
            <Image
              src={uploadImgPlaceholderImg}
              alt="upload your img"
              width={512}
              height={385}
              className="w-full h-full"
            />
          </div>

          <div></div>
        </label>
      </div>
    </div>
  );
}

export default AddCategoryForm;
