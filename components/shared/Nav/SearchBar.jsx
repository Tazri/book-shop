import { CgMenuGridO } from "react-icons/cg";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import NavCategoryList from "./NavCategoryList";
import { topSearchAction } from "@/actions/serverActons";

function SearchBar() {
  return (
    <form
      action={topSearchAction}
      className="flex text-lg text-primary px-3 lg:px-12"
    >
      <div className="flex border px-3.5 py-2 items-center gap-2 cursor-pointer relative group">
        <CgMenuGridO className="text-xl" /> Categories{" "}
        <RiArrowDownSLine className="group-hover:rotate-180 duration-75" />
        <NavCategoryList />
      </div>

      <div className="border-y border-l flex-grow">
        <input
          placeholder="Search Something..."
          name="search"
          className="px-3.5 py-2 focus:outline-none placeholder:text-slate-600 text-primary-shade-30 w-full"
        />
      </div>

      <button className="border-y">
        <div className="border-y border-r rounded-l-md px-3.5 py-2 flex items-center justify-center bg-primary text-white h-full">
          <IoSearchOutline />
        </div>
      </button>
    </form>
  );
}

export default SearchBar;
