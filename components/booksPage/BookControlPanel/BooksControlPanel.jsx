"use client";
import { IoFilter } from "react-icons/io5";
import FilterDrawer from "./FilterDrawer";
import { filterDrawerId } from "@/components/htmlIds/ids";
import { useRouter } from "next/navigation";

const sorting = {
  default_sort: "Default Sorting",
  sort_by_rating: "Sort By Rating",
  sort_by_popularity: "Sort By Popularity",
  sort_by_latest: "Sort By Latest",
};

function BooksControlPanel({ searchParams: propsSearchParams }) {
  const router = useRouter();
  const urlSearchParams = new URLSearchParams(propsSearchParams);

  const sort = urlSearchParams.get("sort");

  const selectedSort = sorting[sort] ? sorting[sort] : sorting.default_sort;

  const handleSorting = (value) => {
    urlSearchParams.set("sort", value);
    const url = "/books?" + urlSearchParams.toString();
    router.replace(url);
  };

  return (
    <div className="container px-1 mx-auto my-4">
      <div className="border py-2 px-3 flex justify-between text-[0.6rem] s185:text-xs s200:text-sm s240:text-base  duration-200 text-[#333333]">
        {/** filter button */}
        <label
          htmlFor={filterDrawerId}
          className="flex flex-wrap gap-1 s200:gap-2 items-center w-fit cursor-pointer"
        >
          <IoFilter /> Filter
        </label>

        {/* sorting option */}
        <div>
          <div className="group relative">
            <button>{selectedSort}</button>

            <div className="flex flex-col w-fit absolute left-1/2 -translate-x-1/2 top-[109%] bg-white px-3 py-2 border rounded-sm scale-y-0 group-hover:scale-y-100 duration-200 origin-top border-t-primary">
              {Object.keys(sorting)?.map((sortOp, index) => {
                return (
                  <button
                    onClick={() => handleSorting(sortOp)}
                    className={`whitespace-nowrap text-start text-[0.6rem] s200:text-xs s240:text-sm my-0.5 duration-150 ${
                      sorting[sortOp] === selectedSort
                        ? "font-semibold pointer-events-none"
                        : "hover:text-primary"
                    }`}
                    key={index + sortOp}
                  >
                    {sorting[sortOp]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <FilterDrawer />
    </div>
  );
}

export default BooksControlPanel;
