import { useEffect, useRef, useState } from "react";
import AdminInputField from "./AdminInputField";
import { isValidPropertyKeyName } from "@/libs/validation";

const defaultValues = {
  Education: "SSC",
  Live: "Comilla",
  Gender: "Male",
};

function AdminOthersDetails({
  maxWidth = "50rem",
  label = "Details",
  required,
  info,
  property,
  setProperty = () => {},
}) {
  const entries = Object.entries(property);

  const deleteProperty = (value) => {
    setProperty((oldProperty) => {
      const keys = Object.keys(oldProperty);

      const updateProperty = {};
      for (const key of keys) {
        if (key === value) continue;
        updateProperty[key] = oldProperty[key];
      }
      return updateProperty;
    });
  };
  return (
    <div
      className="flex flex-col"
      style={{
        maxWidth: maxWidth,
      }}
    >
      <p className="text-base s380:text-lg text-[#222222] select-none duration-150">
        {label}
        {required ? <span className="text-primary">*</span> : ""}
      </p>
      {info ? (
        <p className="text-[#444444] text-xs select-none">{info}</p>
      ) : null}

      <Adder property={property} setProperty={setProperty} />

      {entries?.length ? (
        <Table entries={entries} deleteProperty={deleteProperty} />
      ) : null}
    </div>
  );
}

function Adder({ property, setProperty }) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState(null);
  const [keyError, setKeyError] = useState(null);
  const keys = Object.keys(property);
  const allOk = !keyError;
  const keyRef = useRef();
  const valueRef = useRef();

  const handleAdd = () => {
    const valueTrim = value.trim();
    if (!valueTrim) {
      setValueError({ message: "Please enter value." });
    }

    const keyTrim = key.trim();
    if (!keyTrim) {
      setKeyError({ message: "Please enter key." });
    }
    if (!keyTrim || !valueTrim) return;

    setProperty((oldProperty) => {
      return { ...oldProperty, [key]: valueTrim };
    });

    setKey("");
    setValue("");
  };

  const handleKeyChange = (e) => {
    const value = e.target.value;
    setKey(value);

    const check = isValidPropertyKeyName(value);

    if (check !== true) {
      setKeyError({ message: check });
      return;
    }

    if (keys.includes(value)) {
      setKeyError({ message: "Keys are already included" });
      return;
    }

    setKeyError(null);
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    setValue(value);
    setValueError(null);
  };

  useEffect(() => {
    if (keyError) {
      keyRef?.current?.focus();
    }
  }, [keyError]);

  useEffect(() => {
    if (!keyError && valueError) {
      valueRef?.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueError]);

  useEffect(() => {
    if (!keys.includes(key)) {
      setKeyError(null);
    }
  }, [property]);

  return (
    <div className="mt-2">
      <div className="flex gap-2 flex-col sm:flex-row">
        <AdminInputField
          label="Key"
          info="Key must be unique"
          required={false}
          value={key}
          onChange={handleKeyChange}
          error={keyError}
          ref={keyRef}
        />
        <AdminInputField
          label="Value"
          info="Value not required to be unique."
          required={false}
          onChange={handleValueChange}
          value={value}
          error={valueError}
          ref={valueRef}
        />
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="text-white bg-emerald-600 self-center mt-1 px-2 py-1 text-sm"
      >
        ADD
      </button>
    </div>
  );
}

function Table({ entries, deleteProperty }) {
  return (
    <div className="overflow-x-scroll w-full text-sm md:text-base">
      <table className="mt-2 border text-[#444444] w-full">
        <thead>
          <tr>
            <th className="font-semibold text-left border duration-150 px-2 w-40 lg:w-52">
              Key
            </th>
            <th className="font-semibold text-left border duration-150 px-2">
              Value
            </th>
            <th className="font-semibold text-left border duration-150 px-2 w-20 lg:w-24">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry, index) => {
            return (
              <Row
                key={`${entry[0]}+${index}`}
                entry={entry}
                handleDelete={deleteProperty}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Row({ entry, handleDelete }) {
  return (
    <tr className="border-b">
      <td className="px-2 py-2">{entry[0]}</td>
      <td className="px-2 py-2">{entry[1]}</td>
      <td className="px-2 py-2">
        <button
          type="button"
          onClick={() => handleDelete(entry[0])}
          className="bg-red-600 text-white py-1 px-2 hover:opacity-90 duration-150 text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default AdminOthersDetails;
