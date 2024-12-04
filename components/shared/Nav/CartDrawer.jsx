"use client";
import { cartDrawerId } from "@/components/htmlIds/ids";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoBookOutline, IoCloseOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import DrawerCartBookCard from "./DrawerCartBookCard";

function CartDrawer() {
  const closeRef = useRef();
  return (
    <div>
      <input
        type="checkbox"
        className="peer hidden"
        id={cartDrawerId}
        ref={closeRef}
      />

      <label
        htmlFor={cartDrawerId}
        className="fixed top-0 left-0 h-full w-full bg-black opacity-0 peer-checked:opacity-30 pointer-events-none peer-checked:pointer-events-auto z-50"
      ></label>

      <div className="w-full max-w-[340px] h-full bg-white fixed top-0 right-0 z-50 translate-x-full peer-checked:translate-x-0 duration-200 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <label
            htmlFor={cartDrawerId}
            className="cursor-pointer text-lg s310:text-xl"
          >
            <IoCloseOutline />
          </label>

          <div className="flex items-center justify-center gap-2 uppercase">
            Cart
            <span>
              <IoCartOutline className="text-2xl text-primary" />
            </span>
          </div>
        </div>

        <div className="p-3 flex flex-col justify-between flex-grow">
          <div>
            <DrawerCartBookCard />
          </div>

          <Summary closeRef={closeRef} />
        </div>
      </div>
    </div>
  );
}

function Summary({ closeRef }) {
  const router = useRouter();

  const goPage = (link) => {
    closeRef?.current?.click();
    router.push(link);
  };
  return (
    <div>
      <div className="flex flex-col text-xs s185:text-sm text-gray-600">
        <div className="border-y py-3 flex flex-col gap-2">
          <div className="flex justify-between flex-wrap">
            <span>Total :</span> <span>1130$</span>
          </div>
          <div className="flex justify-between flex-wrap">
            <span>Discount :</span> <span>-130$</span>
          </div>
        </div>

        <div className="flex justify-between py-3">
          <span>Discount Price :</span>{" "}
          <span className="font-semibold">1000$</span>
        </div>
      </div>

      <div className="flex px-2 py-3 gap-4 text-[0.50rem] s185:text-xs s310:text-base">
        <button
          href="#cart"
          className="block w-full py-2 border border-gray-400 text-gray-600 text-center hover:bg-primary hover:text-white hover:border-primary duration-300 "
          onClick={() => goPage("/cart")}
        >
          View Cart
        </button>
        <button
          href="#order"
          className="block w-full py-2 border border-gray-400 text-gray-600 text-center hover:bg-primary hover:text-white hover:border-primary duration-300 "
          onClick={() => goPage("#order")}
        >
          Order
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;
