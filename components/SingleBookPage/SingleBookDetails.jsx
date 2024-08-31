import React from "react";
import SpecificationTable from "./SpecificationTable";

function SingleBookDetails() {
  return (
    <div>
      <h3>Book Specification & Summary</h3>

      <div>
        <input
          type="radio"
          className="peer/spec hidden"
          defaultChecked
          name="tab"
          id="spec-tab"
        />
        <input
          type="radio"
          className="peer/author hidden"
          name="tab"
          id="author-tab"
        />

        <label
          htmlFor="spec-tab"
          className="cursor-pointer -mb-[1px] px-3 py-2 inline-block text-[#222222] duration-150 border border-white border-b-[#cccccc] rounded-t-md peer-checked/spec:text-primary peer-checked/spec:border-t-primary peer-checked/spec:border-b-white peer-checked/spec:border-x-[#cccccc]"
        >
          Specification
        </label>
        <label
          htmlFor="author-tab"
          className="cursor-pointer px-3 py-2 inline-block text-[#222222] -mb-[1px] duration-150 border border-white border-b-[#cccccc] rounded-t-md peer-checked/author:text-primary peer-checked/author:border-t-primary peer-checked/author:border-b-white peer-checked/author:border-x-[#cccccc]"
        >
          Author
        </label>

        <div className="border-[#cccccc] border-t"></div>

        <div className="hidden peer-checked/spec:block p-1">
          <SpecificationTable />
        </div>

        <div className="hidden peer-checked/author:block p-1">Author</div>
      </div>
    </div>
  );
}

export default SingleBookDetails;
