import BookCard from "@/components/shared/BookCard/BookCard";
import Pagination from "@/components/shared/Pagination/Pagination";
import { getDemoBook } from "@/data/demoData";

function BookDisplay({ searchParams }) {
  const books = getDemoBook();

  return (
    <div>
      <h2 className="mb-2 text-[#666666] text-sm lg:hidden">
        Showing 1-3 Of 34 Results
      </h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 duration-200">
        {books?.map((book, index) => {
          return <BookCard key={`${book?.id}+${index}`} book={book} />;
        })}
      </div>
      <Pagination path={"/books"} searchParams={searchParams} />
    </div>
  );
}

export default BookDisplay;
