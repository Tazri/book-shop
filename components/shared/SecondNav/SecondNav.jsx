import { categoryDrawerId } from "@/components/htmlIds/ids.js";
import CategoryDrawer from "./CategoryDrawer";
import { CgMenuGridO } from "react-icons/cg";

function SecondNav() {
  return (
    <div className="border-y py-1 shadow-sm">
      <div className="container mx-auto flex items-center justify-between duration-200 px-1">
        <div className="s310:flex py-2 items-center gap-2 cursor-pointer text-primary">
          <label htmlFor={categoryDrawerId} className="cursor-pointer">
            <CgMenuGridO className="text-lg s310:text-2xl" />
          </label>
          <CategoryDrawer />
        </div>

        <ul className="flex flex-wrap gap-2 s310:gap-3 text-[8px] s310:text-sm sm:text-base">
          <Link isActive>Home</Link>
          <Link>Store</Link>
          <Link>Authors</Link>
          <Link>Publisher</Link>
        </ul>
      </div>
    </div>
  );
}

function Link({ children, isActive = false }) {
  return (
    <li
      className={` cursor-pointer ${
        isActive
          ? "text-primary-tint-10 font-semibold border-b border-b-primary-tint-20"
          : "hover:text-primary"
      }`}
    >
      {children}
    </li>
  );
}

export default SecondNav;
