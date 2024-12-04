import Link from "next/link";
import React from "react";

function AdminTablePagination({ pagination, path = "" }) {
  const prevPage = pagination?.activePage <= 1 ? 1 : pagination?.activePage - 1;
  const nextPage =
    pagination?.activePage >= pagination?.totalPages
      ? pagination?.totalPages
      : pagination?.activePage + 1;
  const searchText = pagination?.searchText || "";

  return (
    <ol className="flex justify-end gap-1 text-xs font-medium">
      <PrevButton
        isActive={pagination?.activePage > 1}
        page={prevPage}
        searchText={searchText}
        perPage={pagination?.perPage}
        path={path}
      />

      {pagination?.links?.map((link, index) => {
        if (link !== "...") {
          return (
            <PageButtion
              page={link?.page}
              key={`${link?.page}-${index}`}
              active={link?.page === pagination?.activePage}
              perPage={pagination?.perPage}
              searchText={searchText}
              path={path}
            />
          );
        }
        return <DotButton key={index} />;
      })}

      <NextPage
        page={nextPage}
        perPage={pagination?.perPage}
        searchText={searchText}
        isActive={pagination?.activePage < pagination?.totalPages}
        path={path}
      />
    </ol>
  );
}

function PageButtion({
  page,
  active,
  perPage = 5,
  searchText = "",
  path = "/",
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);
  searchParams.set("perPage", perPage);
  if (searchText) {
    searchParams.set("search", searchText);
  }
  const queryString = searchParams.toString();
  return (
    <li>
      <Link
        href={baseUrl + path + "?" + queryString}
        className={`inline-flex size-8 items-center justify-center rounded border  rtl:rotate-180 ${
          active
            ? "border-primary bg-primary text-white"
            : "border-gray-100 bg-white text-gray-900"
        }`}
      >
        {page}
      </Link>
    </li>
  );
}

function DotButton() {
  return (
    <li>
      <span className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 select-none">
        ...
      </span>
    </li>
  );
}

function PrevButton({
  isActive,
  perPage = 5,
  page = 1,
  searchText = "",
  path = "",
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const searchParams = new URLSearchParams();
  searchParams.set("perPage", perPage);
  searchParams.set("page", page);

  if (searchText) {
    searchParams.set("search", searchText);
  }
  const queryStr = searchParams.toString();
  return (
    <li className="select-none">
      <Link
        href={baseUrl + path + "?" + queryStr}
        className={`inline-flex size-8 items-center justify-center rounded border  rtl:rotate-180 border-gray-100 bg-white text-gray-900 ${
          isActive ? "" : "pointer-events-none cursor-not-allowed"
        }`}
      >
        <span className="sr-only">Prev Page</span>
        <PrevSvg />
      </Link>
    </li>
  );
}

function NextPage({
  isActive,
  perPage = 5,
  page = 1,
  searchText = "",
  path = "",
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const searchParams = new URLSearchParams();
  searchParams.set("perPage", perPage);
  searchParams.set("page", page);

  if (searchText) {
    searchParams.set("search", searchText);
  }
  const queryStr = searchParams.toString();
  return (
    <li className="select-none">
      <Link
        href={baseUrl + path + "?" + queryStr}
        className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
          isActive ? "" : "pointer-events-none cursor-not-allowed"
        }`}
      >
        <span className="sr-only">Next Page</span>
        <NextSvg />
      </Link>
    </li>
  );
}

function PrevSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-3"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function NextSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-3"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default AdminTablePagination;
