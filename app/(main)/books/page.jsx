import BooksControlPanel from "@/components/booksPage/BookControlPanel/BooksControlPanel";
import FilterForm from "@/components/booksPage/FilterForm/FilterForm";

function BookPage({ searchParams }) {
  return (
    <>
      <BooksControlPanel searchParams={searchParams} />

      <div className="container mx-auto">
        <FilterForm />
      </div>
    </>
  );
}

export default BookPage;
