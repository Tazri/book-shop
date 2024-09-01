import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

function RatingAndReview() {
  return (
    <div className="px-1 text-[#555555]">
      <h4 className="text-xs s240:text-sm s260:text-base s320:text-lg s500:text-xl my-3 text-[#222222] duration-150">
        Ratings
      </h4>
      <div className="flex gap-7 items-center">
        {/** rating summary */}
        <div className="flex flex-col gap-2">
          <h4 className="text-4xl text-[#333333]">4.0</h4>

          <div className="flex gap-0.5 text-primary text-xl">
            <Stars />
          </div>

          <p className="text-[#444444]">4.2 Rating & 1 Review</p>
        </div>

        <div className="flex-grow max-w-80">
          <RatingRow star={5} />
          <RatingRow star={4} />
          <RatingRow star={3} />
          <RatingRow star={2} />
          <RatingRow star={1} />
        </div>
      </div>
    </div>
  );
}

function RatingRow({ star }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex text-primary">
        <Stars star={star} />
      </div>

      <div className="h-2 flex-grow bg-[#cccccc] rounded-full overflow-hidden">
        <div style={{ width: "20%" }} className="h-2 bg-primary"></div>
      </div>

      <span>3</span>
    </div>
  );
}

function Stars({ star = 3.5 }) {
  const floatPart = star - Math.trunc(star);

  const starInt = Math.trunc(star);
  const stars = [];

  for (let i = 0; i < starInt; i++) {
    stars.push(<FaStar key={i + "fill"} />);
  }

  let unFillStar = 5 - starInt;

  if (floatPart >= 0.5) {
    stars.push(<FaRegStarHalfStroke key="half-star" />);
    unFillStar--;
  }

  for (let i = 0; i < unFillStar; i++) {
    stars.push(<FaRegStar key={i + "unfill"} />);
  }

  return stars;
}
export default RatingAndReview;
