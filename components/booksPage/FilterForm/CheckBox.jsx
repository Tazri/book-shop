import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

function CheckBox({ display, value, name, id = "", defaultChecked }) {
  return (
    <label
      className="gap-2 flex items-center capitalize select-none cursor-pointer"
      htmlFor={name + value + id}
    >
      <span className="relative overflow-hidden">
        <input
          type="checkbox"
          className="peer hidden"
          name={name + "-" + value}
          value={name + "-" + value}
          defaultChecked={defaultChecked}
          id={name + value + id}
        />
        <MdOutlineCheckBoxOutlineBlank className="peer-checked:text-primary" />
        <IoIosCheckbox className="absolute top-full left-0 peer-checked:-translate-y-full duration-200 text-primary" />
      </span>
      {display}
    </label>
  );
}

export default CheckBox;
