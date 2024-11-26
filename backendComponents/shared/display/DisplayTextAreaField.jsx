import React from "react";

function DisplayTextAreaField({ label, info, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-lg text-[#222222]">{label}</p>
      <p className="text-sm text-[#555555]">{info}</p>
      <textarea
        readOnly
        value={value}
        className="border p-2 bg-[#eeeeee] text-base text-[#333333] focus:outline-none h-52"
      />
    </div>
  );
}

export default DisplayTextAreaField;
