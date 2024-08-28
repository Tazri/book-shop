import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

function CheckBox({ children, value, name }) {
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

export default CheckBox;
