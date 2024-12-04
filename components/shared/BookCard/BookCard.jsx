import Image from "next/image";
import defaultImage from "@/assets/comics/a_silent_voice_by_yoshitoki_oima.webp";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Link from "next/link";

// w-auto s410:w-32 s450:w-36 s500:w-40 s550:w-44 s600:w-48 s690:w-40 md:w-40 lg:w-44 s1400:w-48

function BookCard({ book }) {
  return (
    <div className="w-full group hover:shadow-lg h-full">
      <div className="w-full relative overflow-hidden">
        <Link
          href={"/books/" + book?.id}
          className="block aspect-[62/89] w-full"
        >
          <Image
            src={book?.img ? book.img : defaultImage}
            height={1000}
            width={1000}
            alt="book image"
            className=""
          />
        </Link>
        <button className="bg-primary text-white w-full absolute bottom-0 left-0 translate-y-0 sm:translate-y-[120%] group-hover:translate-y-0 duration-200 s450:py-2  s280:py-1 py-0.5 s450:text-sm sm:text-base  s320:text-xs text-[0.65rem]">
          Add To Card
        </button>
      </div>

      <div className="p-2 text-sm flex flex-col gap-0.5">
        <h3 className="line-clamp-2  s500:text-base s450:text-sm s260:text-xs text-[0.6rem] leading-3 duration-200 text-[#282828] font-semibold">
          <Link href={"/books/" + book?.id}>
            {book?.name ? book?.name : "Book Name"}
          </Link>
        </h3>
        <h4 className="line-clamp-1 s500:text-base s450:text-sm s260:text-xs text-[0.6rem] leading-3 text-[#434343] duration-200">
          {book?.author ? book?.author : "Author Name"}
        </h4>

        <div className="flex gap-1 items-center">
          <Stars star={book?.rating} />
          <span className="text-[0.6rem] s280:text-[0.7rem] text-[#434343] duration-150">
            (16)
          </span>
        </div>

        <p className="s500:text-base s450:text-sm s260:text-xs text-[0.6rem] leading-3 duration-200 text-primary font-semibold">
          123 $ <span className="text-[#6c6c6c] line-through">432 $</span>
        </p>
      </div>
    </div>
  );
}

function Stars({ star = 3.5 }) {
  const floatPart = star - Math.trunc(star);

  const starInt = Math.trunc(star);
  const stars = [];

  for (let i = 0; i < starInt; i++) {
    stars.push(
      <FaStar
        key={i + "fill"}
        className="s280:text-sm text-[0.6rem] duration-150"
      />
    );
  }

  let unFillStar = 5 - starInt;

  if (floatPart >= 0.5) {
    stars.push(
      <FaRegStarHalfStroke
        key="half-star"
        className="s280:text-sm text-[0.6rem] duration-150"
      />
    );
    unFillStar--;
  }

  for (let i = 0; i < unFillStar; i++) {
    stars.push(
      <FaRegStar
        key={i + "unfill"}
        className="s280:text-sm text-[0.6rem] duration-150"
      />
    );
  }

  return <div className="flex flex-wrap gap-0.5 text-primary">{stars}</div>;
}

export default BookCard;
