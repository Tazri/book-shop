import { forwardRef, useEffect, useRef, useState } from "react";

const options = ["private", "unknown"];

/**
 * @param {{ label: string }} props - Component props
 * @param {React.Ref<HTMLDivElement>} ref - Ref for the div element
 */
const AdminBirthDateField = function (
  {
    label = "Date of Birth",
    maxWidth = "50rem",
    id,
    required = true,
    info,
    error,
    inputName,
    clearErrors,
    setValue,
    defaultSelect = "date",
    defaultDateValue = "",
    ...inputRest
  },
  _
) {
  const [select, setSelect] = useState(
    defaultSelect === "private" || defaultDateValue === "unknown"
      ? defaultSelect
      : "date"
  );
  const ref = useRef();

  useEffect(() => {
    if (error) {
      ref.current?.focus();
    }
  }, [error]);

  useEffect(() => {
    if (!options.includes(select)) {
      setValue(inputName, defaultDateValue);
    }
  }, [select, defaultDateValue, inputName, setValue]);

  const handleOptionChange = (option) => {
    setSelect(option);
    if (options.includes(option)) {
      clearErrors(inputName);
      setValue(inputName, option);
    } else {
      setValue(inputName, "");
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    const isoFormet = new Date(date).toISOString();
    setValue(inputName, isoFormet);
    clearErrors(inputName);
  };

  const defaultValue = [...options, ""].includes(defaultDateValue)
    ? ""
    : new Date(defaultDateValue).toISOString().split("T")[0];

  return (
    <div
      className="flex flex-col"
      style={{
        maxWidth: maxWidth,
      }}
    >
      <label
        className="text-sm s380:text-base text-[#222222] select-none duration-100"
        htmlFor={id}
      >
        {label}
        {required ? <span className="text-primary">*</span> : ""}
      </label>

      {info && <p className="text-[#444444] text-xs select-none">{info}</p>}

      {/* Select options */}
      <div className="mt-2 flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => handleOptionChange("date")}
          className={`py-1 px-2 hover:opacity-80 duration-100 text-primary border-primary border text-sm ${
            select === "date" ? "text-white bg-primary" : "text-primary"
          } `}
        >
          Date
        </button>
        <button
          type="button"
          onClick={() => handleOptionChange("private")}
          className={`py-1 px-2 hover:opacity-80 duration-100 text-rose-700 border-rose-700 border text-sm ${
            select === "private" ? "text-white bg-rose-700" : "text-rose-700"
          } `}
        >
          Private
        </button>
        <button
          type="button"
          onClick={() => handleOptionChange("unknown")}
          className={`py-1 px-2 hover:opacity-80 duration-100 text-gray-700 border-gray-700 border text-sm ${
            select === "unknown" ? "text-white bg-gray-700" : "text-gray-700"
          } `}
        >
          Unknown
        </button>
      </div>

      {/* Conditional Date Input */}
      {select === "date" && (
        <>
          <input
            ref={ref}
            id={id}
            defaultValue={defaultValue}
            type="date"
            className={`border duration-150 px-2 py-1.5 focus:outline-none focus:border-primary text-[#333333] w-full mt-2 text-sm s380:text-base ${
              error ? "border-red-600" : "border-[#cccccc]"
            }`}
            onChange={handleDateChange}
          />
          <input {...inputRest} className="hidden" />
        </>
      )}

      {select !== "date" && (
        <input type="text" className="hidden" id={id} value={select} readOnly />
      )}

      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default forwardRef(AdminBirthDateField);
