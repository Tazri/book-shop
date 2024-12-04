import React from "react";
import { useFieldArray } from "react-hook-form";
import AdminInputField from "./AdminInputField";

/**
 *
 * @param {Object} param0
 * @param {string} param0.name
 * @param {Object} param0.control
 * @param {Function} param0.register
 * @param {string} param0.label
 * @param {Boolean} param0.required
 * @param {Object} param0.errors
 * @returns {JSX.Element}
 */
function AdminOtherPropertyField({
  name,
  control,
  register,
  label = "Property",
  errors,
  required = true,
}) {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  const validateKey = (key, index) => {
    const trimmed = key.trim();
    if (trimmed !== key) return "Key cannot start or end with a space.";
    if (fields.some((field, i) => field.key === trimmed && i !== index))
      return "Key must be unique.";
    return true;
  };

  const addFields = () => {
    append({ key: "", value: "" });
  };

  return (
    <div>
      {" "}
      <p className="text-base s380:text-lg text-[#222222] select-none duration-150">
        {label}
        {required ? <span className="text-primary">*</span> : ""}
      </p>
      {fields?.length <= 0 ? (
        <p className="text-sm text-[#444444]">
          Please click on add button to add new key property.
        </p>
      ) : null}
      {/* all fields */}
      {fields?.map((field, index) => {
        const keyInputName = `${name}.${index}.key`;
        const valueInputName = `${name}.${index}.value`;

        const keyError = errors?.[name]?.[index]?.key;
        const valueError = errors?.[name]?.[index]?.value;
        return (
          <div className={`flex flex-col gap-3 `} key={field?.id}>
            <div className="border-b  pb-2 border-b-[#cccccc]">
              <div className="grid grid-cols-1 gap-2 s500:grid-cols-2 duration-100">
                <AdminInputField
                  {...register(keyInputName, {
                    validate: {
                      required: (value) =>
                        value.trim() !== "" || "Key is required.",
                      unique: (value) =>
                        validateKey(value, index) || "Key must be unique.",
                    },
                  })}
                  label="Key"
                  error={keyError}
                />

                <AdminInputField
                  {...register(valueInputName, {
                    validate: {
                      required: (value) =>
                        value.trim() !== "" || "Value is required.",
                    },
                  })}
                  label="Value"
                  error={valueError}
                />
              </div>
              <RemoveBtn handleClick={() => remove(index)} />
            </div>
          </div>
        );
      })}
      <AddBtn handleClick={addFields} />
    </div>
  );
}

function AddBtn({ handleClick = () => {} }) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="py-1 px-2 text-white bg-emerald-700 my-2 text-sm s500:text-base duration-100 select-none"
    >
      Add Key
    </button>
  );
}

function RemoveBtn({ handleClick = () => {} }) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="bg-red-700 text-white py-1 px-2 mt-2 text-sm s500:text-base duration-100 select-none"
    >
      Remove
    </button>
  );
}

export default AdminOtherPropertyField;
