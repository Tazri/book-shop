import React from "react";
import SpecificationTable from "./SpecificationTable";
import style from "./styles/SingleBookDetails.module.css";
import SingleBookAuthorDetails from "./SingleBookAuthorDetails";

function SingleBookDetails() {
  return (
    <div className={style.singleBookDetails}>
      <h3>Book Specification & Summary</h3>

      <div>
        <input
          type="radio"
          className={style.specInput}
          defaultChecked
          name="tab"
          id="spec-tab"
        />
        <input
          type="radio"
          className={style.authorInput}
          name="tab"
          id="author-tab"
        />

        <label htmlFor="spec-tab" className={style.specLabel}>
          Specification
        </label>
        <label htmlFor="author-tab" className={style.authorLabel}>
          Author
        </label>

        <div className="border-[#cccccc] border-t"></div>

        <div className={style.specTab}>
          <SpecificationTable />
        </div>

        <div className={style.authorTab}>
          <SingleBookAuthorDetails />
        </div>
      </div>
    </div>
  );
}

export default SingleBookDetails;
