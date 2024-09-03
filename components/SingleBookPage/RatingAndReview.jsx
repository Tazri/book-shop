import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import RatingStatus from "./RatingStatus";
import ReviewAndRatingForm from "./ReviewAndRatingForm";

function RatingAndReview() {
  return (
    <div className="px-1 text-[#555555]">
      <h4 className="text-xs s240:text-sm s260:text-base s320:text-lg s500:text-xl my-3 text-[#222222] duration-150">
        Ratings
      </h4>

      <div className="flex flex-col gap-4">
        <ReviewAndRatingForm />
        <RatingStatus />
      </div>
    </div>
  );
}

export default RatingAndReview;
