import AuthorSearchForm from "@/components/authorsPage/AuthorSearchBox";
import LoadAuthorPage from "@/components/authorsPage/LoadAuthorPage";
import BreadCrumb from "@/components/shared/BreadCrumb/BreadCrumb";
import { Suspense } from "react";

async function AuthorsPage({ searchParams }) {
  return (
    <div className="mx-auto container my-2 px-1 flex-grow">
      <BreadCrumb path="/authors" lastPathWord="Authors" />

      <h2 className="text-xl font-light text-[#202020]">Authors</h2>

      <AuthorSearchForm searchParams={searchParams} />

      <Suspense
        fallback={
          <div className="text-center text-gray-600 text-2xl animate-pulse uppercase my-4">
            Loading Authors
          </div>
        }
      >
        <LoadAuthorPage searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default AuthorsPage;
