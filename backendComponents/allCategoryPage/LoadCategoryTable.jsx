import { getCategoryPage } from "@/api/frontend/category";
import AllCategoryTableAndPagination from "./AllCategoryTableAndPagination";

async function LoadCategoryTable({ searchParams }) {
  const paramsPerPage = parseInt(searchParams?.perPage);
  const paramsPage = parseInt(searchParams?.page);

  const perPage = paramsPerPage > 0 ? paramsPerPage : 5;
  const page = paramsPage > 0 ? paramsPage : 1;
  const response = await getCategoryPage(page, perPage);
  const status = response.status;
  const json = await response.json();

  if (status != 200) {
    return (
      <h2 className="text-center text-2xl text-red-500 py-2">
        Failed to Load Categories
      </h2>
    );
  }

  if (json.totalCategory <= 0) {
    return (
      <h2 className="text-center text-2xl text-gray-600 py-2 uppercase">
        There is a no category added.
      </h2>
    );
  }

  return (
    <AllCategoryTableAndPagination
      categories={json?.categories}
      pagination={json.pagination}
    />
  );
}

export default LoadCategoryTable;
