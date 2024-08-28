"use client";
import { filterDrawerId } from "@/components/htmlIds/ids";
import { useRouter } from "next/navigation";
import { useRef } from "react";

function FilterDrawer() {
  const router = useRouter();
  const closeRef = useRef(null);

  const handleClick = () => {
    router.push("#close");
    closeRef?.current?.click();
  };
  return (
    <div>
      <input
        type="checkbox"
        className="peer hidden"
        ref={closeRef}
        id={filterDrawerId}
      />

      <label
        htmlFor={filterDrawerId}
        className="fixed top-0 left-0 h-full w-full bg-black opacity-0 pointer-events-none duration-200 peer-checked:opacity-30 peer-checked:pointer-events-auto"
      ></label>

      <div className="bg-white fixed right-0 top-0 h-full w-44 duration-200 translate-x-full peer-checked:translate-x-0">
        main content
        <button
          onClick={handleClick}
          className="bg-primary text-white py-2 px-3"
        >
          close
        </button>
      </div>
    </div>
  );
}

export default FilterDrawer;
