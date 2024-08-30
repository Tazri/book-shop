import AuthorDisplay from "@/components/authorsPage/AuthorDisplay";
import AuthorSearchForm from "@/components/authorsPage/AuthorSearchBox";
import BreadCrumb from "@/components/shared/BreadCrumb/BreadCrumb";

function AuthorsPage({ searchParams }) {
  return (
    <div className="mx-auto container my-2 px-1">
      <h2 className="text-xl font-light text-[#202020]">Authors</h2>

      <AuthorSearchForm />

      <AuthorDisplay searchParams={searchParams} />
    </div>
  );
}

export default AuthorsPage;
