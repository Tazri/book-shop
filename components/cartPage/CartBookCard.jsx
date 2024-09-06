import Image from "next/image";
import { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import defaultImg from "./../../assets/comics/attack_on_titan_vol_3_by_hajime_isayama.webp";

function CartBookCard({ total = 1, bookId = "book-bookId" }) {
  const [count, setCount] = useState(total);
  const inputRef = useRef();

  const handleIncrement = () => {
    const updateCount = count - 1;

    if (updateCount > 0 && inputRef.current) {
      setCount(updateCount);
      inputRef.current.value = updateCount;
    }
  };

  const handleDecrement = () => {
    const updateCount = count + 1;

    if (updateCount > 0 && inputRef.current) {
      setCount(updateCount);
      inputRef.current.value = updateCount;
    }
  };

  const handleInput = (e) => {
    const num = parseInt(e.target.value);

    if (isNaN(num) && inputRef.current) {
      inputRef.current.value = count;
      return;
    }

    if (num > 0 && num < 100 && inputRef.current) {
      setCount(num);
      inputRef.current.value = num;
    } else if (num >= 100 && inputRef.current) {
      setCount(99);
      inputRef.current.value = 99;
    } else if (num < 1 && inputRef.current) {
      setCount(1);
      inputRef.current.value = 1;
    }
  };

  return (
    <div className="border p-3 flex gap-3 justify-between s240:items-center flex-col  s240:flex-row">
      {/** img */}
      <div className="flex gap-3 duration-150">
        <div className="h-24 s240:h-20 s420:h-28 aspect-[62/89] duration-150">
          <Image
            src={defaultImg}
            height={1000}
            width={1000}
            alt="cart-book"
            className="h-full w-full"
          />
        </div>

        {/** book details */}
        <div className="flex flex-col text-sm s420:text-base duration-150">
          <p className=" text-base s420:text-lg line-clamp-2 duration-150">
            Attack on Titan
          </p>
          <p className="text-[#444444]">Author name</p>

          <p className="flex text-[#444444] gap-1">
            <span className="text-primary">343$</span>
            <span className="line-through">414$</span>
          </p>

          <button className="text-xl text-rose-600">
            <AiOutlineDelete />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center border border-[#eeeeee] bg-[#eeeeee] h-fit flex-row s240:flex-col s340:flex-row self-start s240:self-center">
        <button
          className="py-0.5 s450:py-1.5 px-1.5 s450:px-2.5 text-[#555555] text-xs s450:text-sm duration-150"
          onClick={handleIncrement}
          type="button"
        >
          <FaMinus />
        </button>
        <input
          name={"book-" + bookId}
          type="text"
          className="h-full p-1 focus:outline-none block w-8 s450:w-10 text-center text-[#444444] duration-150 text-sm"
          defaultValue={count}
          onBlur={handleInput}
          ref={inputRef}
        />
        <button
          className="py-0.5 s450:py-1.5 px-1.5 s450:px-2.5 text-[#555555] text-xs s450:text-sm duration-150"
          onClick={handleDecrement}
          type="button"
        >
          <FaPlus />
        </button>
      </div>

      <div className="hidden s450:flex flex-col">
        <p className="text-base s450:text-lg text-primary whitespace-nowrap">
          343 $
        </p>
        <p className="text-[#777777] line-through">414 $</p>
      </div>
    </div>
  );
}

export default CartBookCard;
