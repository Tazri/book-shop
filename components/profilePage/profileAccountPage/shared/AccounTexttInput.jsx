import { forwardRef } from "react";

function WihtoutRefAccountTextInput({ error, ...restProps }, ref) {
  return (
    <input
      {...restProps}
      ref={ref}
      className={`border focus:outline-none text-[#222222] text-[0.65rem]  s200:text-xs  s240:text-sm s410:text-base p-1.5 s350:p-2 duration-150 ${
        error ? "border-rose-600" : ""
      }`}
      type="text"
    />
  );
}

const AccountTextInput = forwardRef(WihtoutRefAccountTextInput);

export default AccountTextInput;
