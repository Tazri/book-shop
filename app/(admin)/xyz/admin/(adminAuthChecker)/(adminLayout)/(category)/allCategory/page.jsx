import LoadCategoryTable from "@/backendComponents/allCategoryPage/LoadCategoryTable";
import { Suspense } from "react";

function AllCategoryPage({ searchParams }) {
  return (
    <div className="p-2">
      <h2 className="text-2xl text-[#333333]">All Categories</h2>
      <div className="p-2">
        <div className="rounded-lg border border-gray-200 max-w-[90rem]">
          <Suspense
            fallback={
              <h2 className="text-center text-2xl text-gray-600 py-2 animate-pulse">
                Load categories
              </h2>
            }
          >
            <LoadCategoryTable searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AllCategoryPage;
