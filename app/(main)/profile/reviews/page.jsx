import SingleReview from "@/components/profilePage/ProfileReviewsPage/SingleReview";
import Pagination from "@/components/shared/Pagination/Pagination";
import React from "react";

function ProfileReviewsPage({ searchParams }) {
  return (
    <div className="px-1 md:px-4 pb-5 pt-3 border-t-0 md:border-t md:border-t-primary flex-col gap-5 flex duration-150">
      <div className="border p-1 s420:p-2 duration-150">
        <h3 className="text-lg s250:text-xl s600:text-2xl text-[#333333] duration-150">
          Reviews
        </h3>
        <p className="text-xs s250:text-sm s600:text-base text-[#555555] duration-150">
          You have reviewed 12 book(s)
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SingleReview id="1" />
        <SingleReview id="2" />
        <SingleReview id="3" />
        <SingleReview id="4" />
        <SingleReview id="5" />
      </div>

      <div>
        <Pagination searchParams={searchParams} />
      </div>
    </div>
  );
}

export default ProfileReviewsPage;
