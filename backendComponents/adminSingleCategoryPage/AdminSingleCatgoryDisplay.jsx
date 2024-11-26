import defaultImg from "@/assets/category/adventure.webp";
import Image from "next/image";
import DisplayTextField from "../shared/display/DisplayTextField";
import DisplayImageField from "../shared/display/DisplayImageField";
import DisplayTextAreaField from "../shared/display/DisplayTextAreaField";

function AdminSingleCatgoryDisplay({ category, edit }) {
  return (
    <div className="max-w-5xl flex flex-col gap-3">
      <DisplayTextField
        label={"Category Name"}
        value={category?.name}
        info={"Category name that represent a group of books"}
      />

      <DisplayTextField
        label={"Total Books"}
        value={category?.totalBooks}
        info={"Total Books under this category has."}
      />

      <DisplayTextAreaField
        label={"Category Description"}
        value={category?.description}
        info={"Description of category, that what type of books it's hold."}
      />

      <button
        onClick={edit}
        className="text-white bg-primary text-lg uppercase w-full max-w-xs py-1"
      >
        Edit
      </button>
    </div>
  );
}

export default AdminSingleCatgoryDisplay;
