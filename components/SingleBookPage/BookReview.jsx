import Image from "next/image";
import defaultImage from "./../../assets/authors/Alfons.webp";
import Stars from "../shared/Stars/Stars";
import Pagination from "../shared/Pagination/Pagination";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";

function BookReview({ searchParams }) {
  return (
    <div className="p-1">
      <p className="text-[#222222] text-2xl mb-3">Reviews</p>

      <div className="flex flex-col gap-3">
        <Review id="1" />
        <Review id="2" />
        <Review id="3" />
        <Review id="4" />
      </div>

      <Pagination searchParams={searchParams} />
    </div>
  );
}

function Review({ id: propsId = "commentId" + Date.now() }) {
  const id = (propsId + Date.now()).replace(" ", "");
  return (
    <div className="border p-2 hover:shadow-md duration-150">
      {/** commenter */}
      <div className="flex gap-1 s320:gap-3 s320:items-center flex-col s320:flex-row duration-150">
        {/** image */}
        <div className="size-9 s350:size-10 md:size-12 rounded-full duration-150">
          <Image
            src={defaultImage}
            width={400}
            height={400}
            alt="commenter avater"
            className="w-full h-full rounded-full"
          />
        </div>

        <div className="h-full flex flex-col justify-between">
          <p className="text-[#222222] text-sm s350:text-base md:text-lg duration-150 flex s320:items-center gap-0.5 s320:flex-row flex-col">
            <span>Alfons{","}</span>
            <span className="text-[#444444] text-xs s350:text-sm md:text-base duration-150">
              05 March 2024
            </span>
          </p>
          <div className="flex gap-0.5 text-primary text-xs s320:text-sm s350:text-base duration-150">
            <Stars star={4} />
          </div>
        </div>
      </div>

      {/** comment */}
      <div className="pt-2">
        <input type="checkbox" className="peer hidden" id={id} />
        <p className="text-[#444444] line-clamp-2 peer-checked:line-clamp-none text-xs s320:text-sm">
          An ingenious concept for a crazy, disturbing tour de force mangaing to
          be appealing to close to all audiences of horror, dark fantasy,
          mystery, crime, philosophy, and humor together Who created it? That
          nobody knows who Tsugumi Ohba really is is freaking funny and adds an
          extra bonus to the mystery of and cult around the series. For an
          average series, this might be no real big selling and advertising
          argument, but because of how big and brilliant this thing is, it adds
          an extra arcane bonus level.
        </p>
        <label
          className="text-primary cursor-pointer select-none hover:underline text-xs s320:text-sm w-fit duration-150 peer-checked:hidden"
          htmlFor={id}
        >
          See More
        </label>

        <label
          className="text-primary cursor-pointer select-none hover:underline text-xs s320:text-sm w-fit duration-150  hidden peer-checked:block"
          htmlFor={id}
        >
          See Less
        </label>
      </div>

      {/** like box */}
      <div className="flex gap-2 mt-4 justify-end">
        <button className="text-[#444444] hover:text-primary flex items-center gap-1">
          <span className="text-xs s340:text-sm duration-150">12</span>
          <SlLike className="text-base s340:text-lg duration-150" />
        </button>
        <button className="text-[#444444] hover:text-red-600 flex items-center gap-1">
          <SlDislike className="text-base s340:text-lg duration-150" />
          <span className="text-xs s340:text-sm duration-150">2</span>
        </button>
      </div>
    </div>
  );
}

export default BookReview;
