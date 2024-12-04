import BooksControlPanel from "@/components/booksPage/BookControlPanel/BooksControlPanel";
import BookDisplay from "@/components/booksPage/BookDisplay/BookDisplay";
import BookDisplayer from "@/components/booksPage/BookDisplayer/BookDisplayer";
import FilterFormContent from "@/components/booksPage/FilterForm/FilterFormContent";
import BreadCrumb from "@/components/shared/BreadCrumb/BreadCrumb";

function BookPage({ searchParams }) {
  return (
    <>
      <BreadCrumb path="/books" />
      <BooksControlPanel searchParams={searchParams} />

      <div className="container mx-auto px-1 flex flex-row gap-1.5">
        <div className="w-0 lg:w-full lg:max-w-60 lg:shrink-0">
          <BookDisplayer searchParams={searchParams}>
            <FilterFormContent />
          </BookDisplayer>
        </div>

        <BookDisplay searchParams={searchParams} />
      </div>
    </>
  );
}

export default BookPage;
