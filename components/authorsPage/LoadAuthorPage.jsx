import Pagination from "../shared/Pagination/Pagination";
import AuthorDisplay from "./AuthorDisplay";
import { getAuthorsPage } from "@/api/frontend/aturhos";

async function LoadAuthorPage({ searchParams }) {
  const perPage = searchParams?.perPage || 10;
  const page = searchParams?.page || 1;
  const searchText = searchParams?.search || "";

  const response = await getAuthorsPage(page, perPage, searchText);
  const json = await response.json();
  const status = response.status;

  if (status !== 200) {
    return (
      <div className="text-center text-red-600 uppercase text-base sm:text-lg md:text-xl lg:text-2xl my-3 duration-150 mt-9">
        Failed to load
      </div>
    );
  }

  if (json?.allAuthors?.length <= 0) {
    return (
      <div className="text-center text-gray-600 uppercase text-base sm:text-lg md:text-xl lg:text-2xl my-3 duration-150 mt-9">
        There is no author
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-[#444444]">32 Authors</p>
      <AuthorDisplay
        allAuthors={json?.allAuthors}
        searchParams={searchParams}
      />

      <div className="my-6">
        <Pagination pagination={json?.pagination} />
      </div>
    </>
  );
}

export default LoadAuthorPage;
