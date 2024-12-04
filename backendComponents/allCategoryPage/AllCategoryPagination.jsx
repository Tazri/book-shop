import Link from "next/link";

function AllCategoryPagination({ pagination }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const prevPage = pagination?.activePage <= 1 ? 1 : pagination?.activePage - 1;
  const nextPage =
    pagination?.activePage >= pagination?.totalPage
      ? pagination?.totalPage
      : pagination?.activePage + 1;

  return (
    <ol className="flex justify-end gap-1 text-xs font-medium">
      <li className="select-none">
        <Link
          href={
            baseUrl +
            `/xyz/admin/allCategory?perPage=${pagination?.perPage}&page=${prevPage}`
          }
          className={`inline-flex size-8 items-center justify-center rounded border  rtl:rotate-180 border-gray-100 bg-white text-gray-900 ${
            pagination?.activePage <= 1
              ? "pointer-events-none cursor-not-allowed"
              : ""
          }`}
        >
          <span className="sr-only">Prev Page</span>
          <PrevSvg />
        </Link>
      </li>

      {pagination?.links?.map((link, index) => {
        if (link === "...") {
          return <DotButton key={index} />;
        }
        return (
          <PageButtion
            page={link?.page}
            key={`${link?.page}-${index}`}
            active={link?.page === pagination?.activePage}
            perPage={pagination?.perPage}
          />
        );
      })}

      <li className="select-none">
        <Link
          href={
            baseUrl +
            `/xyz/admin/allCategory?perPage=${pagination?.perPage}&page=${nextPage}`
          }
          className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
            pagination?.activePage >= pagination?.totalPage
              ? "pointer-events-none cursor-not-allowed"
              : ""
          }`}
        >
          <span className="sr-only">Next Page</span>
          <NextSvg />
        </Link>
      </li>
    </ol>
  );
}

function PageButtion({ page, active, perPage = 5 }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <li>
      <Link
        href={
          baseUrl + `/xyz/admin/allCategory?perPage=${perPage}&page=${page}`
        }
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

export default AllCategoryPagination;
