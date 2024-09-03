"use client";
import Image from "next/image";
import defaultImg from "./../../assets/comics/attack_on_titan_vol_3_by_hajime_isayama.webp";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";

function CartList() {
  return (
    <div className="flex-grow border p-1">
      <div className="flex flex-col gap-3">
        <CartBookCard />
        <CartBookCard />
        <CartBookCard />
        <CartBookCard />
      </div>
    </div>
  );
}
// aspect-[62/89]
function CartBookCard() {
  const [count, setCount] = useState();
  return (
    <div className="border p-3 flex">
      {/** img */}
      <div className="w-24 aspect-[62/89]">
        <Image
          src={defaultImg}
          height={1000}
          width={1000}
          alt="cart-book"
          className="h-full w-full"
        />
      </div>

      {/** book details */}
      <div>
        <p>Attack on Titan</p>
        <p>Author name</p>
        <button>
          <AiOutlineDelete />
        </button>
      </div>

      <div>
        <button>
          <FaMinus />
        </button>
        <input type="text" defaultValue={1} value={count} setCount={count} />
        <button>
          <FaPlus />
        </button>
      </div>

      <div>
        <p>343 $</p>
        <p>414$</p>
      </div>
    </div>
  );
}

export default CartList;
