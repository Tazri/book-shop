import LoadPublishersTable from "@/backendComponents/allPublishersPage/LoadPublishersTable";
import AdminSearchBox from "@/backendComponents/shared/others/AdminSearchBox";
import React, { Suspense } from "react";

function AllPublishersPage({ searchParams }) {
  return (
    <div className="p-2">
      <h2 className="text-2xl text-[#333333]">All Publishers</h2>
      <AdminSearchBox
        defaultParams={{
          page: searchParams?.page || 1,
          perPage: searchParams?.perPage || 10,
        }}
      />
      <div className="p-2">
        <div className="rounded-lg border border-gray-200 max-w-[90rem]">
          <Suspense
            fallback={
              <h2 className="text-center text-2xl text-gray-600 py-2 animate-pulse">
                Load publishers
              </h2>
            }
          >
            <LoadPublishersTable searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AllPublishersPage;
