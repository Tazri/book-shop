import React from "react";
import AllCategoryTable from "./AllCategoryTable";
import AllCategoryPagination from "./AllCategoryPagination";

function AllCategoryTableAndPagination({ categories, pagination }) {
  return (
    <>
      <div className="overflow-x-auto rounded-t-lg">
        <AllCategoryTable categories={categories} />
      </div>

      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <AllCategoryPagination pagination={pagination} />
      </div>
    </>
  );
}

export default AllCategoryTableAndPagination;
