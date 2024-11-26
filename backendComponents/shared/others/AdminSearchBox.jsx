"use client";
import { makeFuncDebounce } from "@/libs/clientLib";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const changeSearchParamsBase = (
  text,
  router,
  defaultParams = { perPage: 10, page: 1 }
) => {
  const params = new URLSearchParams();
  const defaultEntries = Object.entries(defaultParams);

  for (const entry of defaultEntries) {
    params.set(entry[0], entry[1]);
  }

  if (text) {
    params.set("search", text);
  }

  router.push("?" + params.toString());
};

const changeSearchParams = makeFuncDebounce(changeSearchParamsBase, 1500);

function AdminSearchBox({ defaultParams = { perPage: 10, page: 1 } }) {
  const searchParams = useSearchParams();
  const defaultSearchText = searchParams.get("search") || "";
  const [searchText, setSearchText] = useState(defaultSearchText);
  const router = useRouter();

  const handleClick = () => {
    const filterSearchText = searchText
      .trim()
      .split(" ")
      .filter((chunk) => chunk)
      .join(" ");

    if (filterSearchText) {
      changeSearchParamsBase(filterSearchText, router, defaultParams);
    } else {
      changeSearchParamsBase("", router, defaultParams);
    }
  };

  useEffect(() => {
    const filterSearchText = searchText
      .trim()
      .split(" ")
      .filter((chunk) => chunk)
      .join(" ");

    if (filterSearchText) {
      changeSearchParams(filterSearchText, router, defaultParams);
    } else {
      changeSearchParams("", router, defaultParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, router]);
  return (
    <div className="my-2 flex justify-center items-center w-full text-[#555555] max-w-64">
      <input
        className="focus:outline-none text-base self-stretch w-full border-y border-[#777777] border-r peer focus:border-primary duration-100"
        type="text"
        placeholder="Search Word."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="text-xl p-1 border-[#777777] border-y border-l -order-1 peer-focus:border-primary peer-focus:text-primary duration-100">
        <IoMdSearch />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="bg-primary text-white self-stretch border-primary border-y border-r px-2 ml-1"
      >
        Search
      </button>
    </div>
  );
}

export default AdminSearchBox;
