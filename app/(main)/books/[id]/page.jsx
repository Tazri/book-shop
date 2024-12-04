import BreadCrumb from "@/components/shared/BreadCrumb/BreadCrumb";
import RelatedBookDisplay from "@/components/SingleBookPage/RelatedBookDisplay";
import SingleBookDisplay from "@/components/SingleBookPage/SingleBookDisplay";

function BookPage({ params, searchParams }) {
  return (
    <div className="container px-1 mx-auto flex-grow">
      <div className="my-2">
        <BreadCrumb path="/books/id" lastPathWord="Ereased" />
      </div>

      <div className="flex flex-col lg:flex-row gap-2 justify-between">
        <SingleBookDisplay searchParams={searchParams} />
        <RelatedBookDisplay />
      </div>
    </div>
  );
}

export default BookPage;
