import Image from "next/image";
import { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import defaultImg from "./../../assets/comics/attack_on_titan_vol_3_by_hajime_isayama.webp";

function CartBookCard({ total = 1 }) {
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
    } else {
      inputRef.current.value = count;
    }
  };

  return (
    <div className="border p-3 flex gap-3 justify-between items-center">
      {/** img */}
      <div className="flex gap-3">
        <div className="w-20 aspect-[62/89]">
          <Image
            src={defaultImg}
            height={1000}
            width={1000}
            alt="cart-book"
            className="h-full w-full"
          />
        </div>

        {/** book details */}
        <div className="flex flex-col text-base gap-2">
          <p className="text-lg">Attack on Titan</p>
          <p className="text-[#444444]">Author name</p>
          <button className="text-xl text-rose-600">
            <AiOutlineDelete />
          </button>
        </div>
      </div>

      <div className="flex items-center border border-[#eeeeee] bg-[#eeeeee] h-fit">
        <button
          className="py-1.5 px-2.5 text-[#555555] text-sm"
          onClick={handleIncrement}
        >
          <FaMinus />
        </button>
        <input
          type="text"
          className="h-full p-1 focus:outline-none block w-10 text-center"
          defaultValue={count}
          onBlur={handleInput}
          ref={inputRef}
        />
        <button
          className="py-1.5 px-2.5 text-[#555555] text-sm"
          onClick={handleDecrement}
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex flex-col">
        <p className="text-lg text-primary">343 $</p>
        <p className="text-[#777777] line-through">414 $</p>
      </div>
    </div>
  );
}

export default CartBookCard;
