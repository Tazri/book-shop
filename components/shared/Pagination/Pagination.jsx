import { getNextAndPrevPages } from "@/libs/lib";
import Link from "next/link";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

function Pagination({ pagination }) {
  if (!pagination) {
    return (
      <div className="text-gray-700 text-center uppercase">
        There is no pagination
      </div>
    );
  }

  const { nextPage, prevPage } = getNextAndPrevPages(
    pagination?.totalPages,
    pagination?.activePage
  );

  return (
    <div className="w-full mx-auto my-3 flex flex-wrap justify-center">
      <PageButton
        page={prevPage}
        perPage={pagination?.perPage || 10}
        searchText={pagination?.searchText || ""}
        active={prevPage == pagination?.activePage}
      >
        <GrPrevious />
      </PageButton>

      {pagination?.links?.map((link, index) => {
        if (link?.page) {
          return (
            <PageButton
              key={`${link?.page}-${index}`}
              perPage={pagination?.perPage}
              page={link.page}
              searchText={pagination?.searchText}
              active={link.page === pagination?.activePage}
            >
              {link?.page}
            </PageButton>
          );
        }
        return (
          <PageButton key={`...-${index}`} disabled>
            ...
          </PageButton>
        );
      })}

      <PageButton
        page={nextPage}
        perPage={pagination?.perPage || 10}
        searchText={pagination?.searchText || ""}
        active={nextPage == pagination?.activePage}
      >
        <GrNext />
      </PageButton>
    </div>
  );
}

function PageButton({
  page = 1,
  active,
  disabled,
  perPage = 10,
  searchText = "",
  children,
}) {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("perPage", perPage);

  if (searchText) {
    params.set("search", searchText);
  }

  const queryStr = "?" + params.toString();

  if (disabled) {
    return (
      <button
        disabled
        className={`px-1.5 s280:px-2 py-1 border duration-200 text-[0.4rem] s320:text-[0.5rem] s340:text-[0.6rem]  s380:text-xs s450:text-sm s580:text-base flex items-center justify-center  ${
          active ? "text-primary" : "text-[#444444]"
        }`}
      >
        {children}
      </button>
    );
  }
  return (
    <Link
      scroll={true}
      href={queryStr}
      className={`px-1.5 s280:px-2 s320:px-2 s580:px-3 py-1 border duration-200 text-[0.4rem] s320:text-[0.5rem] s340:text-[0.6rem]  s350:text-xs s450:text-sm s580:text-base flex items-center justify-center ${
        active ? "text-primary pointer-events-none" : "text-[#444444]"
      } disabled:opacity-75 `}
    >
      {children}
    </Link>
  );
}

export default Pagination;
