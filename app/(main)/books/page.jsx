import BooksControlPanel from "@/components/booksPage/BookControlPanel/BooksControlPanel";
import BookDisplayer from "@/components/booksPage/BookDisplayer/BookDisplayer";

function BookPage({ searchParams }) {
  return (
    <>
      <BooksControlPanel searchParams={searchParams} />

      <div className="container mx-auto">
        <BookDisplayer />
      </div>
    </>
  );
}

export default BookPage;
