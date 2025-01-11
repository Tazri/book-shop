import AdminAuthorsTable from "./AdminAuthorsTable";
import AdminAuthorsPagination from "./AdminAuthorsPagination";
import { getAuthorsPage } from "@/api/frontend/aturhos";

async function AdminDisplayAllAuthors({ searchParams }) {
  const perPage = searchParams?.perPage || 10;
  const page = searchParams?.page || 1;
  const searchText = searchParams?.search || "";
  const response = await getAuthorsPage(page, perPage, searchText);

  if (response === null) {
    return (
      <h2 className="text-center text-2xl text-red-500 py-2">
        Failed to Load Publishers
      </h2>
    );
  }

  const json = await response.json();
  const status = response.status;

  if (status != 200) {
    return (
      <h2 className="text-center text-2xl text-red-500 py-2">
        Failed to Load Publishers
      </h2>
    );
  }

  return (
    <>
      <div className="rounded-t-lg overflow-y-scroll">
        <p className="p-2 text-[#444444]">
          Total Authors : {json?.totalAuthors}
        </p>
        {json?.allAuthors?.length > 0 ? (
          <AdminAuthorsTable authors={json?.allAuthors} />
        ) : (
          <p className="text-2xl text-center text-[#555555] py-2">No Result</p>
        )}
      </div>
      {json?.totalAuthors > 0 ? (
        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <AdminAuthorsPagination pagination={json?.pagination} />
        </div>
      ) : null}
    </>
  );
}

export default AdminDisplayAllAuthors;
