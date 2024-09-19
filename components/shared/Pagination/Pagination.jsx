import { getPagination } from "@/libs/lib";
import Link from "next/link";

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { URLSearchParams as NodeURLSearchParams } from "url";

function Pagination({ path, searchParams, lastPage = 34 }) {
  const queryObj = new NodeURLSearchParams(searchParams);
  const pageQuery = queryObj.get("page");
  let activePage = pageQuery ? parseInt(pageQuery) : 1;

  if (isNaN(activePage)) {
    activePage = 1;
  }

  const pageArray = getPagination(lastPage, activePage);

  // make prevPageQueryString
  queryObj.set("page", activePage - 1);
  const prevPageQueryString = queryObj.toString();

  // make nextPageQueryString
  queryObj.set("page", activePage + 1);
  const nextPageQueryString = queryObj.toString();

  return (
    <div className="w-fit mx-auto my-3 flex flex-wrap">
      <PageButton
        href={path + "?" + prevPageQueryString}
        page={<GrPrevious />}
        disabled={activePage <= 1}
      />

      {pageArray?.map((page) => {
        queryObj.set("page", page);
        const queryString = queryObj.toString();

        return (
          <PageButton
            disabled={activePage === page || page === "..."}
            href={"?" + queryString}
            active={activePage === page}
            page={page}
            key={page}
          />
        );
      })}

      <PageButton
        disabled={activePage === lastPage}
        href={path + "?" + nextPageQueryString}
        page={<GrNext />}
      />
    </div>
  );
}

function PageButton({ page = 1, active, disabled, href = "#" }) {
  if (disabled) {
    return (
      <button
        disabled
        className={`px-1 s240:px-2 py-1 border duration-200 text-[0.4rem] s320:text-[0.5rem] s340:text-[0.6rem]  s380:text-xs s450:text-sm s580:text-base flex items-center justify-center disabled:cursor-not-allowed ${
          active ? "text-primary" : "text-[#444444]"
        }`}
      >
        {page}
      </button>
    );
  }
  return (
    <Link
      scroll={true}
      href={href}
      className={`px-0.5 s200:px-1 s320:px-2 s580:px-3 py-1 border duration-200 text-[0.4rem] s320:text-[0.5rem] s340:text-[0.6rem]  s350:text-xs s450:text-sm s580:text-base flex items-center justify-center ${
        active ? "text-primary" : "text-[#444444]"
      } disabled:cursor-not-allowed disabled:opacity-75 `}
    >
      {page}
    </Link>
  );
}

export default Pagination;
