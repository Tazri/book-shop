import Image from "next/image";
import defaultImage from "./../../assets/comics/fullmetal_alchemist_brotherhood_hiromu_arakawa.jpg.webp";

function RelatedBookDisplay() {
  return (
    <div className="flex-grow">
      <div className="min-w-[19rem]">
        <h2 className="px-2 py-3 border border-t-primary border-t-2 text-[#222222]">
          Releated Book
        </h2>

        {/** book card */}
        <div>
          <ReleatedBookCard />
          <ReleatedBookCard />
          <ReleatedBookCard />
          <ReleatedBookCard />
          <ReleatedBookCard />
        </div>
      </div>
    </div>
  );
}

// aspect-[62/89]
function ReleatedBookCard() {
  return (
    <div className="border-x border-b first:border-t-0 px-2 py-3 flex gap-3">
      {/** image */}
      <div className="w-20">
        <Image
          src={defaultImage}
          alt="book-image"
          height={1000}
          width={1000}
          className="h-full w-full"
        />
      </div>

      {/** details */}
      <div className="text-[#444444] text-sm">
        <p className="text-[#222222] text-base">
          Full Metal Alchecmist Brotherhood
        </p>
        <p>Writer Name</p>

        <p>
          <span className="line-through">200 $</span>{" "}
          <span className="text-primary">320 $</span>
        </p>
      </div>
    </div>
  );
}

export default RelatedBookDisplay;
