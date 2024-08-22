"use client";
import { searchModalId } from "@/components/htmlIds/ids";
import { IoCloseOutline } from "react-icons/io5";
import SearchModalForm from "./SearchModalForm";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const defaultTopSearchLink = [
  {
    name: "Mist",
    link: "#mist",
  },
  {
    name: "English",
    link: "#english",
  },
  {
    name: "History",
    link: "#history",
  },
  {
    name: "Programming",
    link: "#programming",
  },
  {
    name: "Motivation",
    link: "#motivation",
  },
  {
    name: "Story",
    link: "#story",
  },
];

function SearchModal({ links = defaultTopSearchLink }) {
  const closeRef = useRef();
  function searchAction(formData) {
    "user client";
    console.log(formData);
  }

  return (
    <>
      <input
        ref={closeRef}
        id={searchModalId}
        type="checkbox"
        className="peer hidden"
      />
      <label
        htmlFor={searchModalId}
        className="h-full w-full fixed top-0 left-0 bg-black opacity-0 peer-checked:opacity-30 peer-checked:pointer-events-auto pointer-events-none duration-150"
      ></label>

      <div className="h-full s420:h-auto  w-full max-w-[420px] bg-white fixed top-0 left-1/2 -translate-x-1/2 peer-checked:translate-y-0 s420:peer-checked:translate-y-7 -translate-y-full duration-200">
        <div className="p-3 flex justify-between items-center text-sm s310:text-lg border-b">
          <span className="text-primary">Search Your Book</span>
          <label
            htmlFor={searchModalId}
            className="cursor-pointer text-lg s310:text-xl"
          >
            <IoCloseOutline />
          </label>
        </div>

        <SearchModalForm closeRef={closeRef} />

        <div className="p-3">
          <p className="text-primary">You May Like to Search : </p>
          <div className="my-3 flex flex-wrap gap-3">
            {links?.map((link) => {
              return (
                <SearchLink
                  key={link?.link}
                  href={link?.link}
                  closeRef={closeRef}
                >
                  {link?.name}
                </SearchLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function SearchLink({ children, href = "#", closeRef }) {
  const router = useRouter();

  const handleClick = () => {
    closeRef?.current?.click();
    router.push(href);
  };
  return (
    <span
      href={href}
      onClick={handleClick}
      className="bg-gray-200 hover:bg-primary-tint-10 hover:text-white px-3 py-2 rounded-full text-gray-600 text-xs s310:text-sm cursor-pointer"
    >
      {children}
    </span>
  );
}

export default SearchModal;
