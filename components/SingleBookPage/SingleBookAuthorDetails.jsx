import Image from "next/image";
import defaultImage from "./../../assets/authors/Levi_Ackermann.webp";

const singleBookAuthorDetailsId = "single-book-author-details-id";

function SingleBookAuthorDetails() {
  return (
    <div className="flex flex-col s350:flex-row gap-3 my-3">
      {/** avatar */}
      <div className="flex s350:flex-col s350:px-3 justify-start items-center gap-1 s220:gap-2 s350:gap-1 md:gap-2 duration-200">
        {/** image */}
        <div className=" rounded-full size-16 s260:size-20 s350:size-24 s420:size-28 md:size-32 duration-200">
          <Image
            src={defaultImage}
            alt="authorImage"
            height={1000}
            width={1000}
            className="w-full rounded-full"
          />
        </div>

        <div className="flex-col flex s350:items-center gap-1 s220:gap-2 s350:gap-1 md:gap-2 duration-200">
          <h2 className="s350:hidden text-[#222222] text-sm s260:text-base duration-200">
            Levi Ackerman
          </h2>

          <div className="flex-col s220:flex-row s350:flex-col flex items-start s220:items-center gap-1 md:gap-2">
            <p className="text-[#333333] text-[0.65rem] s260:text-xs s420:text-sm md:text-base duration-200">
              <span className="text-[#444444] font-semibold">23</span> Books
            </p>
            <button className="py-0.5 px-1 s240:px-1.5 s260:px-2 md:px-3 text-[0.65rem] s260:text-xs s420:text-sm md:text-base bg-primary text-white rounded-sm hover:opacity-95 duration-200">
              See more
            </button>
          </div>
        </div>
      </div>

      {/** details */}
      <div>
        <h2 className="hidden s350:block s420:text-lg md:text-xl text-[#222222] duration-200">
          Levi Ackerman
        </h2>
        <input
          id={singleBookAuthorDetailsId}
          type="checkbox"
          className="peer hidden"
        />
        <p className="line-clamp-6 md:line-clamp-5 s350:mt-0.5 s420:mt-1.5 text-[#333333] peer-checked:line-clamp-none text-xs s420:text-sm md:text-base duration-200">
          Levi Ackermann is the strongest and most talented soldier of the
          Survey Corps and is the leader of the Special Operations Squad. Levi
          with a dark past lived his life as a thug in the underground before
          changing his life in the Survey Corps, thanks to Erwin Smith who
          scouted him. Although very cold, distant, and strict, he has strong
          leadership skills that inspire the people around him. The main
          character of Attack on Titan, Eren Jaeger especially, respects Levi
          for his leadership and abilities. Levi is often seen disciplining and
          controlling his subordinates through physical means, especially, Eren
          but all with good intention. His strictness in his lessons are all
          necessary when trying to instruct his subordinates who can potentially
          lose their lives due to simple mistakes within the battlefield. Being
          in such a high ranking position makes him feel responsible for the
          soldiers he leads and shows distress when they die. Throughout the
          series, Levi is seen attacking Titans swiftly and effectively while
          having an expressionless face most of the time.
        </p>

        <label
          className="text-primary hover:underline cursor-pointer select-none text-xs s420:text-sm md:text-base duration-200 peer-checked:hidden"
          htmlFor={singleBookAuthorDetailsId}
        >
          Show More
        </label>

        <label
          className="text-primary hover:underline cursor-pointer select-none text-xs s420:text-sm md:text-base duration-200 hidden peer-checked:block"
          htmlFor={singleBookAuthorDetailsId}
        >
          Show Less
        </label>
      </div>
    </div>
  );
}

export default SingleBookAuthorDetails;
