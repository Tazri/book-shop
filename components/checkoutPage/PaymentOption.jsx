import Image from "next/image";
import React from "react";
import defaultImage from "@/assets/payment-option-icons/cash-on-delivery.webp";

function PaymentOption({ children, text, value }) {
  return (
    <label className="border-2 rounded-sm cursor-pointer flex items-center gap-1.5 s280:gap-2 s240:gap-4 px-1 s320:px-2 py-2 select-none basis-64 s872:max-w-xs flex-grow">
      {/** radio button */}
      <input
        type="radio"
        className="peer hidden"
        value={value}
        name="payment"
      />
      <div
        after=""
        className="size-2 s220:size-3 s240:size-4 border border-primary rounded-full relative flex items-center justify-center after:content-[attr(after)] after:block after:w-[80%] after:h-[80%] after:rounded-full after:bg-primary after:scale-0 peer-checked:after:scale-100 duration-150 after:duration-200 shrink-0"
      ></div>

      {/** details */}
      <div className="flex items-center gap-2">
        {children}

        {text && (
          <p className="text-xs s240:text-sm s280:text-base text-[#444444] duration-150">
            {text}
          </p>
        )}
      </div>
    </label>
  );
}
export default PaymentOption;
