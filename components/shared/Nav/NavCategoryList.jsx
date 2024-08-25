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

function NavCategoryList({ category = defaultCategoryList }) {
  return (
    <div className="absolute z-50 left-0 top-full bg-white min-w-56 mt-2 shadow-md scale-y-0 group-hover:scale-y-100 duration-100 origin-top rounded-md flex flex-col">
      {category?.map(({ name, value }) => {
        return (
          <NavLi key={value + name} name={name} value={value}>
            {name}
          </NavLi>
        );
      })}
    </div>
  );
}

function NavLi({ children, value, name }) {
  return (
    <label
      className="py-2 px-3 border border-gray-100  text-gray-500 duration-100 first:rounded-t-md last:rounded-b-md cursor-pointer gap-2 flex items-center capitalize select-none"
      htmlFor={"nav-category-" + value}
    >
      <span className="relative overflow-hidden">
        <input
          type="checkbox"
          className="peer hidden"
          name={name}
          value={value}
          id={"nav-category-" + value}
        />
        <MdOutlineCheckBoxOutlineBlank className="peer-checked:text-primary" />
        <IoIosCheckbox className="absolute top-full left-0 peer-checked:-translate-y-full duration-200 text-primary" />
      </span>
      {children}
    </label>
  );
}

export default NavCategoryList;
