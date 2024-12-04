import AdminDisplayAllAuthors from "@/backendComponents/authorsPage/AdminDisplayAllAuthors";
import DisplayAuthorPage from "@/backendComponents/authorsPage/AdminDisplayAllAuthors";
import AdminBackButton from "@/backendComponents/shared/others/AdminBackButton";
import AdminSearchBox from "@/backendComponents/shared/others/AdminSearchBox";
import React, { Suspense } from "react";

function AuthorsPage({ searchParams }) {
  return (
    <div className="p-2">
      <h2 className="text-2xl text-[#333333]">All Authors</h2>
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
                Load categories
              </h2>
            }
          >
            <AdminDisplayAllAuthors searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AuthorsPage;
