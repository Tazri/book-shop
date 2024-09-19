import React from "react";
import defaultImage from "@/assets/book_webp/a_theory_of_fun_game_design.webp";
import Image from "next/image";
import Stars from "@/components/shared/Stars/Stars";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

function SingleReview({ id: propsId = "review-description" }) {
  const id = "review-description" + propsId;
  return (
    <div className="border p-1 s420:p-2 duration-150 flex gap-3  s450:flex-row flex-col">
      {/* img */}
      <div className="w-full max-w-32 s240:max-w-36 lg:max-w-40 duration-150">
        <div className="aspect-[62/89] w-full">
          <Image
            src={defaultImage}
            width={1000}
            height={700}
            className="object-cover h-full"
            alt="book-img"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        {/** name and author */}
        <div>
          <h3 className="text-sm s220:text-base s320:text-lg lg:text-xl text-[#222222] duration-150">
            A Theory of Fun Game Design
          </h3>
          <p className="text-xs s220:text-sm s320:text-base lg:text-lg text-[#555555] duration-150">
            by{" "}
            <Link href="#" className="text-primary hover:underline">
              Raph Koster
            </Link>
          </p>
          <p className="text-xs s320:text-sm text-[#555555]">21 June 2024</p>
        </div>

        <div className="flex gap-0.5 text-primary s220:text-base text-sm duration-150">
          <Stars star={2.7} />
        </div>

        <div className="text-xs s280:text-sm lg:text-base duration-150">
          <input type="checkbox" className="peer hidden" id={id} />
          <p className=" text-[#555555] line-clamp-4 peer-checked:line-clamp-none">
            Now in full color, the 10th anniversary edition of this classic book
            takes you deep into the influences that underlie modern video games,
            and examines the elements they share with traditional games such as
            checkers. At the heart of his exploration, veteran game designer
            Raph Koster takes a close look at the concept of fun and why it’s
            the most vital element in any game. Why do some games become boring
            quickly, while others remain fun for years? How do games serve as
            fundamental and powerful learning tools? Whether you’re a game
            developer, dedicated gamer, or curious observer, this illustrated,
            fully updated edition helps you understand what drives this major
            cultural force, and inspires you to take it further.
          </p>

          <label
            htmlFor={id}
            className="cursor-pointer text-primary-shade-10 hover:underline peer-checked:hidden"
          >
            See More
          </label>
          <label
            htmlFor={id}
            className="cursor-pointer text-primary-shade-10 hover:underline peer-checked:block hidden"
          >
            See Less
          </label>
        </div>

        <div>
          <Link
            href="#"
            className="text-xs s220:text-sm text-primary flex items-center gap-1 group"
          >
            Go to book page{" "}
            <FaArrowRight className="group-hover:translate-x-1 duration-150" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleReview;
