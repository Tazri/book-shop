"use client";

import { useState } from "react";
import style from "./rangeStyle.module.css";

function PriceRange() {
  const [price, setPrice] = useState(2000);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value >= 0 && value <= 2000) {
      setPrice(value);
    }
  };

  return (
    <div>
      <div className="select-none cursor-pointer border p-1.5 text-[0.9rem] duration-200 text-[#212121]">
        Price
      </div>

      <div className="border-b border-x p-1.5 duration-200 flex flex-col gap-5 pt-3.5">
        <input
          id="price-filter"
          type="range"
          name="price-filter"
          className={"w-full " + style.range}
          min={0}
          max={2000}
          value={price}
          onChange={handleChange}
        />
        <div className="w-full flex justify-between items-center text-sm">
          <span>Max :</span>
          <input
            type="number"
            min={0}
            max={20000}
            value={price}
            onChange={handleChange}
            className="block w-full max-w-20 border border-[#c0c0c0] py-0.5 px-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default PriceRange;
