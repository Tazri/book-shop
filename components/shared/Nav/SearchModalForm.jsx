"use client";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";

const defaultCategoryList = [
  {
    name: "History",
    value: "history",
  },
  {
    name: "Story",
    value: "story",
  },
  {
    name: "Computer",
    value: "computer",
  },
  {
    name: "Comics",
    value: "comics",
  },
];

function SearchModalForm({ closeRef, categoryList = defaultCategoryList }) {
  function action(formData) {
    "use client";
    console.log(Object.fromEntries([...formData.entries()]));
    closeRef?.current?.click();
  }
  return (
    <form action={action} className="p-3">
      <div>
        <div className="flex text-lg text-primary px-3 lg:px-12">
          <div className="border-y border-l flex-grow flex justify-center items-center">
            <input
              placeholder="Search Something..."
              name="search"
              className="pl-3.5 pr-1 py-2 h-full focus:outline-none text-xs placeholder:text-slate-600 text-primary-shade-30 w-full"
            />
          </div>

          <button className="border-y">
            <div className="border-y border-r rounded-l-md px-2 s310:px-3.5 py-2 flex items-center justify-center bg-primary text-white h-full duration-200">
              <IoSearchOutline className="text-xs s310:text-base" />
            </div>
          </button>
        </div>
      </div>

      <div className="px-3 py-2">
        <p className="text-xs s310:text-base text-primary-shade-10 pb-2">
          Select Category
        </p>

        <div className="flex flex-wrap gap-2">
          {categoryList?.map(({ name, value }) => {
            return (
              <NavLi key={name + value} name={name} value={value}>
                {name}
              </NavLi>
            );
          })}
        </div>
      </div>
    </form>
  );
}

function NavLi({ children, value, name }) {
  return (
    <label
      className="py-1 px-3 text-gray-500 duration-100 cursor-pointer gap-1 flex items-center capitalize select-none bg-gray-100 text-xs s420:text-base"
      htmlFor={"search-modal-" + value}
    >
      <span className="relative overflow-hidden">
        <input
          type="checkbox"
          className="peer hidden"
          name={name}
          value={value}
          id={"search-modal-" + value}
        />
        <MdOutlineCheckBoxOutlineBlank className="peer-checked:text-primary" />
        <IoIosCheckbox className="absolute top-full left-0 peer-checked:-translate-y-full duration-200 text-primary" />
      </span>
      {children}
    </label>
  );
}

export default SearchModalForm;
