import React from "react";

const AdminTextAreaField = React.forwardRef(function AdminTextAreaField(
  {
    label = "Your label",
    info,
    error,
    required = true,
    type = "text",
    placeholder,
    id,
    maxWidth = "50rem",
    className,
    ...inputRest
  },
  ref
) {
  return (
    <div
      className="flex flex-col"
      style={{
        maxWidth: maxWidth,
      }}
    >
      <label
        className="text-sm s380:text-base text-[#222222] select-none duration-150"
        htmlFor={id}
      >
        {label}
        {required ? <span className="text-primary">*</span> : ""}
      </label>
      {info ? (
        <p className="text-[#444444] text-xs select-none">{info}</p>
      ) : null}
      <textarea
        {...inputRest}
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`border duration-150 px-2 py-1.5 focus:outline-none focus:border-primary text-[#333333] w-full mt-1 text-sm s380:text-base ${
          error ? "border-red-600" : "border-[#cccccc]"
        } ${className}`}
      />
      {error ? <p className="text-xs text-red-600">{error?.message}</p> : null}
    </div>
  );
});

export default AdminTextAreaField;
