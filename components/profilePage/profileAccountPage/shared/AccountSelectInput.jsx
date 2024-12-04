import { forwardRef } from "react";

function WithoutRefSelectField({ error, children, ...others }, ref) {
  return (
    <div
      className={`w-full pr-3 bg-[#eeeeee] ${
        error ? "border-rose-600 border" : ""
      }`}
    >
      <select
        {...others}
        ref={ref}
        className="w-full bg-transparent focus:outline-none cursor-pointer text-[#222222] text-[0.65rem]  s200:text-xs  s240:text-sm s410:text-base p-1.5 s350:p-2 duration-150"
      >
        {children}
      </select>
    </div>
  );
}

const AccountSelectInput = forwardRef(WithoutRefSelectField);
export default AccountSelectInput;
