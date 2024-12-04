import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import defaultImg from "./../../assets/comics/attack_on_titan_vol_3_by_hajime_isayama.webp";

function CartBookCard({
  total = 1,
  bookId = "book-bookId",
  register,
  setValue,
}) {
  const [count, setCount] = useState(total);
  const inputName = "book-" + bookId;

  const handleIncrement = () => {
    const updateCount = count + 1;

    if (updateCount < 100) {
      setCount(updateCount);
    }
  };

  const handleDecrement = () => {
    const updateCount = count - 1;
    if (updateCount >= 1) {
      setCount(updateCount);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setCount("");
      return;
    }

    if (!isNumberText(value)) return;

    setCount(parseInt(value));
  };

  const handleBlur = () => {
    if (count === "") {
      setCount(1);
      return;
    }

    if (count > 99) {
      setCount(99);
      return;
    }

    if (count < 1) {
      setCount(1);
      return;
    }
  };

  useEffect(() => {
    setValue(inputName, count);
  }, [setValue, count, inputName]);

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
          onClick={handleDecrement}
          type="button"
        >
          <FaMinus />
        </button>
        <input
          {...register(inputName)}
          name={inputName}
          type="text"
          className="h-full p-1 focus:outline-none block w-8 s450:w-10 text-center text-[#444444] duration-150 text-sm"
          value={count}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <button
          className="py-0.5 s450:py-1.5 px-1.5 s450:px-2.5 text-[#555555] text-xs s450:text-sm duration-150"
          onClick={handleIncrement}
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

function isNumberText(num) {
  const digits = "0123456789";

  for (const char of num) {
    if (!digits.includes(char)) return false;
  }

  return true;
}

export default CartBookCard;
