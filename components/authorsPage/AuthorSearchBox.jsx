"use client";
import { makeFuncDebounce } from "@/libs/clientLib";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const loadAuthors = async (router, searchText = "", perPage = 10, page = 1) => {
  const filterText = searchText
    .trim()
    .split(" ")
    .filter((chunk) => chunk !== " ")
    .join(" ");

  const params = new URLSearchParams();

  if (filterText) {
    params.set("search", filterText);
  }

  params.set("perPage", perPage);
  params.set("page", page);

  const queryStr = params.toString();
  router.push("?" + queryStr);
};

// Debounced version of loadAuthors
const loadDebouncedAuthor = makeFuncDebounce(loadAuthors, 1700);

function AuthorSearchForm({ searchParams }) {
  const [searchText, setSearchText] = useState(searchParams?.search || "");
  const router = useRouter();

  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    loadDebouncedAuthor(router, text, 10, 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadAuthors(router, searchText, 10, 1);
  };

  return (
    <form className="flex my-2" onSubmit={handleSubmit}>
      <input
        value={searchText}
        onChange={handleChange}
        className="w-full max-w-80 border text-lg focus:outline-none py-0.5 px-2 text-[#303030] border-[#bbbbbb]  duration-150 rounded-l-sm"
      />
      <button
        type="submit"
        className="text-white bg-primary px-2 text-xl flex items-center rounded-r-sm"
      >
        <IoSearchSharp />
      </button>
    </form>
  );
}

export default AuthorSearchForm;
