"use client";
import useAuthor from "@/hooks/backend/useAuthor";
import AdminSIngleAuthorNameAndDescription from "./AdminSIngleAuthorNameAndDescription";
import Line from "../shared/display/Line";
import AdminAuthorImgDisplay from "./AdminAuthorImgDisplay";
import AdminAuthorDateDisplay from "./AdminAuthorDateDisplay";
import AdminAuthorPropertyDisplay from "./AdminAuthorPropertyDisplay";
import AdminAuthorDelete from "./AdminAuthorDelete";

function AdminSingleAuthorLoader({ id }) {
  const { loading, error, author, setAuthor, loadAuthor } = useAuthor(id);

  if (loading) {
    return <LoadingAuthor />;
  }

  if (error) {
    return <ErrorMessage message={error} onClick={loadAuthor} />;
  }

  if (!author) {
    return (
      <div className="text-center">
        <h2 className="text-gray-600 text-2xl">
          Please wait. Author will load. If not loaded then click on below
          button.
        </h2>
        <button
          className="py-1 px-2 bg-primary text-white mt-1 hover:opacity-95 duration-75"
          type="button"
          onClick={loadAuthor}
        >
          Load Author
        </button>
      </div>
    );
  }

  return (
    <div>
      <AdminSIngleAuthorNameAndDescription
        setAuthor={setAuthor}
        author={author}
      />
      <Line />
      <AdminAuthorDateDisplay author={author} setAuthor={setAuthor} />
      <Line />
      <AdminAuthorPropertyDisplay author={author} setAuthor={setAuthor} />
      <Line />
      <AdminAuthorImgDisplay author={author} setAuthor={setAuthor} />
      <Line />
      <AdminAuthorDelete author={author} />
    </div>
  );
}

function LoadingAuthor() {
  return (
    <h1 className="text-center animate-pulse text-gray-500 text-xl">
      Author Loading
    </h1>
  );
}

function ErrorMessage({ onClick = () => {}, message }) {
  return (
    <div className="text-center">
      <h2 className="text-red-600 text-2xl">Failed to Load</h2>
      {message && <p className="text-red-400">{message}</p>}
      <button
        className="py-1 px-2 bg-primary text-white mt-1 hover:opacity-95 duration-75"
        type="button"
        onClick={onClick}
      >
        Try Load Data Again.
      </button>
    </div>
  );
}

export default AdminSingleAuthorLoader;
