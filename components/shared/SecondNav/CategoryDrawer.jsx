"use client";
import { categoryDrawerId } from "@/components/htmlIds/ids.js";
import { IoCloseOutline } from "react-icons/io5";
import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultLinks = [
  {
    name: "History",
    link: "#history",
  },
  {
    name: "Math",
    link: "#math",
  },
  {
    name: "Science",
    link: "#science",
  },
  {
    name: "Mystery",
    link: "#mystery",
  },
];

function CategoryDrawer({ links = defaultLinks }) {
  const router = useRouter();
  const inputRef = useRef();

  const seeMoreHandle = () => {
    router.push("/category");
    inputRef?.current?.click();
  };
  return (
    <div>
      <input
        id={categoryDrawerId}
        type="checkbox"
        className="peer hidden"
        ref={inputRef}
      />
      <label
        htmlFor={categoryDrawerId}
        className="fixed top-0 left-0 h-full w-full bg-black opacity-0 peer-checked:pointer-events-auto pointer-events-none peer-checked:opacity-40 duration-100 z-50"
      ></label>

      <div className="fixed h-full w-full max-w-[280px] bg-white top-0 left-0 z-50 shadow-md -translate-x-full peer-checked:translate-x-0 duration-300 flex flex-col">
        <div className="p-3 flex justify-between text-gray-600 items-center border-b text-sm s310:text-base">
          <p className="">Category</p>{" "}
          <label htmlFor={categoryDrawerId} className="cursor-pointer">
            <IoCloseOutline />
          </label>
        </div>

        <ul className="p-3 text-gray-800">
          {links?.map((link) => {
            return (
              <DrawerLink inputRef={inputRef} link={link.link} key={link.link}>
                {link.name}
              </DrawerLink>
            );
          })}
        </ul>

        <button
          onClick={seeMoreHandle}
          className="text-center px-3 py-2 text-white bg-primary mx-3 hover:opacity-90 rounded-sm"
        >
          See More
        </button>
      </div>
    </div>
  );
}

function DrawerLink({ inputRef, children, link = "#name" }) {
  const router = useRouter();
  const handleLinkClick = () => {
    inputRef?.current?.click();
    router.push(link);
  };
  return (
    <li
      className="flex items-center gap-2 hover:text-primary-tint-10 duration-200 text-xs s310:text-base cursor-pointer border-b py-2 relative group"
      onClick={handleLinkClick}
    >
      {children}
      <div className="w-full h-[1px] bg-primary-tint-20 absolute bottom-0 left-0 origin-left scale-x-0 group-hover:scale-100 duration-200"></div>
    </li>
  );
}

export default CategoryDrawer;
