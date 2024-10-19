import AddCategoryForm from "@/backendComponents/addCategoryPage/AddCategoryForm";
import React from "react";

function AddCategoryPage() {
  return (
    <div className="p-2">
      <h2 className="text-2xl text-[#333333]">Add a Category</h2>
      <AddCategoryForm />
    </div>
  );
}

export default AddCategoryPage;
