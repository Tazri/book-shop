import BookCard from "@/components/shared/BookCard/BookCard";
import Pagination from "@/components/shared/Pagination/Pagination";
import { getDemoBook } from "@/data/demoData";
import React from "react";

function ProfileWishListPage({ searchParams }) {
  const books = getDemoBook();

  return (
    <div className="px-1 md:px-4 pb-5 pt-3 border-t-0 md:border-t md:border-t-primary flex-col gap-5 flex duration-150">
      <div className="border p-1 s420:p-2 flex flex-col duration-150">
        <h3 className="text-lg s250:text-xl s600:text-2xl text-[#333333] duration-150">
          My Wish List
        </h3>
        <p className="text-xs s320:text-sm s600:text-base text-[#555555] duration-150">
          Your have 12 product(s)
          <br />
          in your wishlist.
        </p>
      </div>

      <div className="p-1 s420:p-2 grid grid-cols-2 s420:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-x-1.5 s280:gap-x-2 gap-y-5">
        {books?.map((book) => (
          <BookCard key={book?.id} book={book} />
        ))}
      </div>
      <div>
        <Pagination searchParams={searchParams} />
      </div>
    </div>
  );
}

export default ProfileWishListPage;
