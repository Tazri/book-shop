import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Stars from "../shared/Stars/Stars";

function RatingStatus() {
  return (
    <div>
      <p className="mb-5">Ratings</p>

      <div className="flex gap-3 s550:gap-7 s550:items-center text-[#555555] flex-col s550:flex-row duration-150">
        {/** rating summary */}
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl s250:text-4xl text-[#333333] duration-150">
            4.0
          </h4>

          <div className="flex gap-0.5 text-primary text-base s250:text-xl duration-150">
            <Stars />
          </div>

          <p className="text-xs s200:text-sm s250:text-base text-[#444444] duration-150">
            4.2 Rating & 1 Review
          </p>
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
    <div className="flex items-center gap-1 s200:gap-2 w-full">
      <div className="flex text-primary text-[0.6rem] s200:text-xs s320:text-sm duration-150">
        <Stars star={star} />
      </div>

      <div className="h-1 s280:h-1.5 flex-grow bg-[#cccccc] rounded-full overflow-hidden duration-150">
        <div style={{ width: "20%" }} className="h-2 bg-primary"></div>
      </div>

      <span className="text-xs s320:text-sm text-[#555555]">{star}</span>
    </div>
  );
}

export default RatingStatus;
