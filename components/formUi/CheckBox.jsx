import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

function CheckBox({ name, id = "", defaultChecked, value }) {
  return (
    <label
      className="gap-2 flex items-center capitalize select-none cursor-pointer"
      htmlFor={id}
    >
      <span className="relative overflow-hidden">
        <input
          type="checkbox"
          className="peer hidden"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          id={id}
        />
        <MdOutlineCheckBoxOutlineBlank className="peer-checked:text-primary" />
        <IoIosCheckbox className="absolute top-full left-0 peer-checked:-translate-y-full duration-200 text-primary" />
      </span>
    </label>
  );
}

export default CheckBox;
