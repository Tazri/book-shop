import { getAllCategory } from "@/api/frontend/category";
import React from "react";
import CategorySwiper from "./CategorySwiper";

async function LoadHomePageCategory() {
  const response = await getAllCategory();
  const status = response.status;
  const jsonData = await response.json();

  if (status !== 200) {
    return (
      <h1 className="text-xl text-center text-gray-700 py-2">
        Category failed loaded.
      </h1>
    );
  }

  return <CategorySwiper displayAllCategory={jsonData.categories} />;
}

export default LoadHomePageCategory;
