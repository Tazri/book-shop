import { getPublishersPageAPI } from "@/api/frontend/publishers";
import AdminPublisherTable from "./AdminPublisherTable";
import AdminTablePagination from "../shared/others/AdminTablePagination";

async function LoadPublishersTable({ searchParams }) {
  const paramsPerPage = parseInt(searchParams?.perPage);
  const paramsPage = parseInt(searchParams?.page);

  const perPage = paramsPerPage > 0 ? paramsPerPage : 10;
  const page = paramsPage > 0 ? paramsPage : 1;
  const searchText = searchParams?.search || "";
  const response = await getPublishersPageAPI(page, perPage, searchText);
  const json = await response.json();
  const status = response.status;

  if (status != 200) {
    return (
      <h2 className="text-center text-2xl text-red-500 py-2">
        Failed to Load Publishers
      </h2>
    );
  }

  if (json?.totalPublishers <= 0) {
    return (
      <h2 className="text-center text-2xl text-gray-600 py-2 uppercase">
        There is a no publishers added.
      </h2>
    );
  }

  return (
    <>
      <div className="rounded-t-lg overflow-y-scroll">
        <p className="p-2 pb-0 text-[#444444] text-sm">
          Total Publishers : {json?.totalPublishers}
        </p>
        <p className="p-2 pt-0.5 pb-2 text-[#444444] text-sm">
          Total Publishers in this page : {json?.totalPublishersInThisPage}
        </p>

        {json?.allPublishers?.length > 0 ? (
          <AdminPublisherTable allPublishers={json?.allPublishers} />
        ) : (
          <p className="text-2xl text-center text-[#555555] py-2">No Result</p>
        )}
      </div>
      {json?.totalPublishers > 0 ? (
        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <AdminTablePagination
            pagination={json?.pagination}
            path="/xyz/admin/allPublishers"
          />
        </div>
      ) : null}
    </>
  );
}

export default LoadPublishersTable;
