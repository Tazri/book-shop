import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

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

export default Stars;
