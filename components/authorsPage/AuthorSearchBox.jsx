import { authorsSearchAction } from "@/actions/serverActons";
import { redirect } from "next/dist/server/api-utils";
import { IoSearchSharp } from "react-icons/io5";
import { URLSearchParams as NodeURLSearchParams } from "url";

function AuthorSearchForm() {
  return (
    <form className="flex my-2" action={authorsSearchAction}>
      <input
        name="search"
        className="w-full max-w-80 border text-lg focus:outline-none py-0.5 px-2 text-[#303030] border-[#bbbbbb]  duration-150 rounded-l-sm"
      />
      <button className="text-white bg-primary px-2 text-xl flex items-center rounded-r-sm">
        <IoSearchSharp />
      </button>
    </form>
  );
}

export default AuthorSearchForm;
