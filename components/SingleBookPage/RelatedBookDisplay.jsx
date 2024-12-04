import Image from "next/image";
import defaultImage from "./../../assets/comics/fullmetal_alchemist_brotherhood_hiromu_arakawa.jpg.webp";
import { getDemoBook } from "@/data/demoData";

function RelatedBookDisplay() {
  const books = getDemoBook();
  return (
    <div className="flex-grow">
      <div className="lg:min-w-[19rem]">
        <h2 className="px-2 py-3 border border-t-primary border-t-2 text-[#222222] mb-3 lg:mb-0 duration-150">
          Releated Book
        </h2>

        {/** book card */}
        <div className="grid grid-cols-2 s410:grid-cols-3 s550:grid-cols-4 s650:grid-cols-5  md:grid-cols-6 gap-2 lg:gap-0 lg:flex flex-col">
          {books?.map((book) => {
            return <ReleatedBookCard book={book} key={book?.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

// aspect-[62/89]
function ReleatedBookCard({ book }) {
  return (
    <div className="border-x border-b border-t lg:border-t-0 lg:first:border-t-0 lg:px-2 lg:py-3 gap-2 flex lg:flex-row flex-col my-2 lg:my-0 lg:hover:shadow-none hover:shadow-md duration-150">
      {/** image */}
      <div className="lg:w-20 lg:aspect-[62/89]">
        <Image
          src={book?.img ? book.img : defaultImage}
          alt="book-image"
          height={500}
          width={500}
          className="h-full w-full"
        />
      </div>

      {/** details */}
      <div className="text-[#444444] text-xs md:text-sm lg:p-0 p-1">
        <p className="text-[#222222] text-xs md:text-base">{book?.name}</p>
        <p>{book?.author}</p>

        <p>
          <span className="line-through">200 $</span>{" "}
          <span className="text-primary">320 $</span>
        </p>
      </div>
    </div>
  );
}

export default RelatedBookDisplay;
