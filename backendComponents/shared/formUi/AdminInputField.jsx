import React, { forwardRef } from "react";

const AdminInputField = forwardRef(function AdminInputFieldBase(
  {
    label = "Your label",
    info,
    error,
    required = true,
    type = "text",
    placeholder,
    id,
    ...inputRest
  },
  ref
) {
  return (
    <div className="flex flex-col">
      <label className="text text-[#222222] select-none" htmlFor={id}>
        {label}
        {required ? <span className="text-primary">*</span> : ""}
      </label>
      {info ? (
        <p className="text-[#444444] text-xs select-none">{info}</p>
      ) : null}
      <input
        {...inputRest}
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`border duration-150 px-2 py-1.5 focus:outline-none focus:border-primary text-[#333333] w-full mt-1 ${
          error ? "border-red-600" : "border-[#cccccc]"
        }`}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
});

export default AdminInputField;
