"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

function OrderCancelModal({ id }) {
  const inputRef = useRef();
  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const digits = "0123456789";

    if (value === "") {
      setOrderId(value);
    }

    for (const char of value) {
      if (!digits.includes(char)) return;
    }

    setOrderId(value);
  };

  const handleCancel = () => {
    if (orderId === id) {
      inputRef?.current?.click();
      toast.success("Order is successfully cancel.");
      return;
    }

    if (orderId === "") {
      toast.error("Please type order id.");
      return;
    }

    toast.error("Order id does not match.");
  };

  return (
    <div>
      <input ref={inputRef} type="checkbox" className="peer hidden" id={id} />

      <label
        htmlFor={id}
        className="fixed top-0 left-0 w-full h-full bg-black z-50 opacity-0 peer-checked:opacity-45 pointer-events-none peer-checked:pointer-events-auto duration-150"
      ></label>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-full peer-checked:-translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none peer-checked:pointer-events-auto bg-white py-3 px-1.5 s350:px-3 w-full max-w-xl z-50 duration-150">
        <h2 className="text-xs s220:text-sm s240:text-base s280:text-lg s350:text-xl text-[#333333] duration-150">
          Order ID : {id}
        </h2>
        <p className="text-[0.55rem] s220:text-[0.6rem] s240:text-[0.65rem] s280:text-xs s340:text-sm s450:text-base text-[#555555] duration-150">
          Type order id then click the cancel button.
        </p>

        <input
          className="text-sm s450:text-base border focus:outline-none border-[#777777] my-3 p-1 text-[#444444] w-full duration-150"
          value={orderId}
          onChange={handleChange}
        />

        <div className="flex gap-1 s420:gap-2 flex-col s220:flex-row duration-150">
          <button
            className="bg-red-600 text-white px-3 py-1 text-xs s280:text-sm s450:text-base duration-150"
            onClick={handleCancel}
          >
            Cancel Order
          </button>
          <label
            htmlFor={id}
            className="bg-emerald-600 text-white px-3 py-1 text-xs s280:text-sm s450:text-base duration-150 text-center cursor-pointer"
          >
            Not Now
          </label>
        </div>
      </div>
    </div>
  );
}

export default OrderCancelModal;
