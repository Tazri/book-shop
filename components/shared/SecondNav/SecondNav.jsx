"use client";

import { categoryDrawerId } from "@/components/htmlIds/ids.js";
import CategoryDrawer from "./CategoryDrawer";
import { CgMenuGridO } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SecondNav() {
  const pathname = usePathname();

  return (
    <div className="border-y-[0.4px] border-[#c8c8c849] py-1">
      <div className="container mx-auto flex items-center justify-between duration-200 px-1">
        <div className="s310:flex py-2 items-center gap-2 cursor-pointer text-primary">
          <label htmlFor={categoryDrawerId} className="cursor-pointer">
            <CgMenuGridO className="text-lg s310:text-2xl" />
          </label>
          <CategoryDrawer />
        </div>

        <ul className="flex flex-wrap gap-2 s310:gap-3 text-[8px] s310:text-sm sm:text-base">
          <NavLink isActive={pathname === "/"}>
            <Link href="/">Home</Link>
          </NavLink>

          <NavLink isActive={pathname === "/books"}>
            <Link href="/books">Books</Link>
          </NavLink>

          <NavLink isActive={pathname === "/authors"}>
            <Link href="/authors">Authors</Link>
          </NavLink>

          <NavLink isActive={pathname === "/publishers"}>
            <Link href="/publishers">Publisher</Link>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

function NavLink({ children, isActive = false }) {
  return (
    <li
      className={` cursor-pointer duration-200 ${
        isActive
          ? "text-primary-tint-10 font-semibold border-b border-b-primary-tint-20"
          : "hover:text-primary-tint-10"
      }`}
    >
      {children}
    </li>
  );
}

export default SecondNav;
