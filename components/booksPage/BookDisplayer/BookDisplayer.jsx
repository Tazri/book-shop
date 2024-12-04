"use client";
import { IoCloseOutline } from "react-icons/io5";
import FilterForm from "../FilterForm/FilterForm";
import { filterDrawerId } from "@/components/htmlIds/ids";
import { useRef } from "react";

function BookDisplayer({ searchParams, children }) {
  const closeRef = useRef();
  return (
    <div>
      <input
        type="checkbox"
        className="peer hidden"
        id={filterDrawerId}
        ref={closeRef}
      />

      <label
        htmlFor={filterDrawerId}
        className="lg:hidden fixed top-0 left-0 h-full w-full bg-black peer-checked:opacity-30 pointer-events-none peer-checked:pointer-events-auto z-50 opacity-0 duration-200"
      ></label>

      <div className="flex-grow mb-3 bg-white lg:z-auto lg:h-auto lg:relative lg:border-none fixed right-0 top-0 z-50 border-l h-full w-full max-w-60 flex flex-col translate-x-full lg:translate-x-0 peer-checked:translate-x-0 duration-200">
        <div className="flex items-center justify-between p-4 lg:hidden border-b relative">
          <label
            htmlFor={filterDrawerId}
            className="cursor-pointer text-lg s310:text-xl"
          >
            <IoCloseOutline />
          </label>

          <p className="flex items-center justify-center gap-2 s200:text-base s185:text-sm text-xs">
            Filter and Others
          </p>
        </div>

        <div className=" overflow-y-scroll">
          <div className="lg:border border-none px-1.5 lg:my-0 my-3 lg:px-3 py-2 w-full overflow-y-scroll">
            <h5 className="px-1.5 mb-1.5">Filter</h5>
            <FilterForm closeRef={closeRef} searchParams={searchParams}>
              {children}
            </FilterForm>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDisplayer;
