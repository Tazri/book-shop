"use client";
import { useState } from "react";

const defaultCityAndArea = [
  {
    city: "Dhaka",
    cityId: "dhakaid",
    area: {
      nikonjoId: "Nikonjo",
      khikhetId: "Khilkhet",
      airport: "Airport",
      uttora: "Uttora",
    },
  },
  {
    city: "Comilla",
    cityId: "comillaId",
    area: {
      tomsombridge: "Tomsom Bridge",
      shodorDhokhin: "Shodor Dhokhin",
      "kandir-par": "Kandir Par",
    },
  },
  {
    city: "Feni",
    cityId: "feni",
    area: {
      chagolnaya: "Chagol Naya",
      fatepur: "Fatepur",
      mohipal: "Mohipal",
    },
  },
];

function CartSummary({ cityAndArea: propsCityAndArea = defaultCityAndArea }) {
  const [cityAndArea, setCityAndArea] = useState(propsCityAndArea);

  return (
    <div className="border p-3 flex-grow max-w-96">
      <div className="gap-2 flex flex-col">
        <h2 className="pb-3 border-b mb-3">Shipping Address</h2>

        <div className="w-full pr-3 bg-[#eeeeee]">
          <select
            className="w-full bg-transparent p-2 focus:outline-none cursor-pointer text-[#444444] text-lg"
            defaultChecked=""
          >
            <option value={""}>Select City</option>
            <option value="feni">Feni</option>
            <option value="comilla">Comilla</option>
            <option value="dhaka">Dhaka</option>
          </select>
        </div>

        <textarea className="w-full border border-[#555555] focus:outline-none" />
      </div>
    </div>
  );
}

export default CartSummary;
