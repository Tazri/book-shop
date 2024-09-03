import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import style from "./styles/ReviewAndRatingForm.module.css";

const rating1 = "review-form-rating-1";
const rating2 = "review-form-rating-2";
const rating3 = "review-form-rating-3";
const rating4 = "review-form-rating-4";
const rating5 = "review-form-rating-5";

function ReviewAndRatingForm() {
  return (
    <form className="flex flex-col gap-2">
      <p className="text-xs  s200:text-sm s340:text-base duration-150">
        Rating this product
      </p>

      <div>
        <div className="flex gap-0.5 text-xl">
          <StarInput />
        </div>
      </div>

      <div className="w-full max-w-[28rem]">
        <textarea
          name="raview"
          className="border border-[#666666] rounded-sm focus:outline-none p-1 w-full h-28 text-xs  s200:text-sm s340:text-base duration-150"
          required
        />
      </div>

      <button
        type="button"
        className="bg-primary px-2.5 py-1.5 text-white w-fit rounded-sm hover:opacity-95 duration-150 s280:text-base"
      >
        Submit
      </button>
    </form>
  );
}

function StarInput() {
  return (
    <>
      <input
        type="radio"
        value={1}
        name="rating"
        id={rating1}
        className={style.input1}
      />
      <input
        type="radio"
        value={2}
        name="rating"
        id={rating2}
        className={style.input2}
      />
      <input
        type="radio"
        value={3}
        name="rating"
        id={rating3}
        className={style.input3}
      />
      <input
        type="radio"
        value={4}
        name="rating"
        id={rating4}
        className={style.input4}
      />
      <input
        type="radio"
        value={5}
        name="rating"
        id={rating5}
        className={style.input5}
      />

      <StarLabel id={rating1} starClass={style.star1} title="Bad" />
      <StarLabel id={rating2} starClass={style.star2} title="Not Bad" />
      <StarLabel id={rating3} starClass={style.star3} title="Good" />
      <StarLabel id={rating4} starClass={style.star4} title="Very Good" />
      <StarLabel id={rating5} starClass={style.star5} title="Best" />
    </>
  );
}

function StarLabel({ id = "rating" + Date.now, starClass, title = "ok" }) {
  return (
    <>
      <label htmlFor={id} className={starClass} title={title}>
        <span>
          <FaRegStar />
        </span>
        <span>
          <FaStar />
        </span>
      </label>
    </>
  );
}

export default ReviewAndRatingForm;
