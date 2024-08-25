import Image from "next/image";
import React from "react";
import defaultImage from "@/assets/failback.jpg";
import { IoIosClose } from "react-icons/io";

function DrawerCartBookCard({ image = defaultImage }) {
  return (
    <div className="flex gap-3 text-[0.5rem] s185:text-xs s420:text-base duration-200">
      <div className=" aspect-[171/256] w-7 s185:w-10 s420:w-16 shrink-0 items-center">
        <Image
          width={171}
          height={256}
          src={defaultImage}
          alt="product image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="line-clamp-2">
          The algorithm, understanding for programming problem.
        </p>

        <div className="text-gray-600">
          1 x <span className="text-primary">385 $</span>{" "}
          <span className="line-through decoration-gray-600">770 $</span>
        </div>
      </div>

      <button className="text-sm s310:text-xl s420:text-2xl text-rose-700">
        <IoIosClose />
      </button>
    </div>
  );
}

export default DrawerCartBookCard;
