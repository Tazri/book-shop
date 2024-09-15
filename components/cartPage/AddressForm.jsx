import { isValidPhoneNumber } from "@/libs/validation";
import { useEffect, useState } from "react";

function AddressForm({ register, allCity, setValue, errors, trigger }) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("feniId");
  const [area, setArea] = useState("maijdeeId");

  useEffect(() => {
    setValue("city", city);
    setValue("area", area);
  }, [area, city, setValue]);

  function handlePhone(e) {
    const value = e.target.value;

    if (checkItNumber(value)) {
      setPhone(value);
    }
  }

  const handleAddress = (e) => {
    const value = e.target.value;

    if (!address && value === " ") return;

    if (address.length === 0) {
      setAddress(value);
      return;
    }

    const lastCharOfAddress = address[address.length - 1];
    const lastChar = value[value.length - 1];

    if (lastChar === " " && lastCharOfAddress === " ") return;

    setAddress(value);
  };

  function handleCity(e) {
    const value = e.target.value;

    setCity(value);
    setArea("");
    setValue("area", "");
    trigger(["area"]);
  }

  function handleArea(e) {
    const value = e.target.value;
    setArea(value);
    trigger(["area"]);
  }

  // all area
  const selectedCity = allCity.find((cityObj) => cityObj.id === city);

  const areas = selectedCity ? selectedCity?.area : [];

  const selectClassName =
    "w-full bg-transparent p-2 focus:outline-none cursor-pointer text-[#444444] text-sm s220:text-base   duration-150";

  const { ref: cityRef, ...cityRest } = register("city", {
    require: "Please select city.",
    validate: (value) => (value === "" ? "Please select city" : true),
    onChange: handleCity,
  });

  const { ref: areaRef, ...areaRest } = register("area", {
    require: "Please select area.",
    validate: (value) => (value == "" ? "PLease select area." : true),
    onChange: handleArea,
  });

  const { ref: phoneRef, ...phoneRest } = register("phone", {
    require: "Please enter your phone number.",
    validate: (value) => {
      const check = isValidPhoneNumber(value);
      return check ? check : true;
    },
    onChange: handlePhone,
  });

  const { ref: addressRef, ...addressRest } = register("address", {
    require: "Please enter your address details.",
    validate: (value) => {
      return value?.length < 10 || value?.length > 100
        ? "Address details must be between 10 to 100 characters."
        : true;
    },
    onChange: handleAddress,
  });

  return (
    <div className="gap-3 flex flex-col border p-3">
      <h2 className="pb-3 border-b text-base s280:text-lg text-[#222222] duration-150">
        Shipping Address
      </h2>

      {/* city select */}
      <SelectField error={errors["city"]?.message}>
        <select
          {...cityRest}
          ref={cityRef}
          value={city}
          className={selectClassName}
        >
          <option value="">Select City</option>
          {allCity?.map((city) => {
            return (
              <option key={city?.id} value={city?.id}>
                {city?.name}
              </option>
            );
          })}
        </select>
      </SelectField>

      {/* area select */}
      <SelectField error={errors["area"]?.message}>
        <select
          {...areaRest}
          ref={areaRef}
          value={area}
          className={selectClassName}
        >
          <option value={""}>Select Area</option>
          {areas?.map((area) => {
            return (
              <option value={area?.id} key={area?.id}>
                {area?.name}
              </option>
            );
          })}
        </select>
      </SelectField>

      <InputField error={errors["phone"]?.message}>
        <input
          {...phoneRest}
          ref={phoneRef}
          className={`p-2 border border-[#cccccc] w-full focus:outline-none text-[#444444] text-xs s185:text-sm s450:text-base ${
            errors["phone"]?.message ? "border-rose-600" : ""
          }`}
          type="tel"
          value={phone}
          placeholder="Enter Mobile Number"
        />
      </InputField>

      <InputField error={errors["address"]?.message}>
        <textarea
          {...addressRest}
          ref={addressRef}
          value={address}
          className={`w-full border border-[#cccccc] focus:outline-none min-h-32 p-2 text-[#444444] text-xs s185:text-sm s450:text-base ${
            errors["address"]?.message ? "border-rose-600" : ""
          }`}
          placeholder="Enter More Details of Your Address..."
        />
      </InputField>
    </div>
  );
}

function SelectField({ error, children }) {
  return (
    <div>
      <div
        className={`w-full pr-3 bg-[#eeeeee] ${
          error ? "border border-rose-600" : ""
        }`}
      >
        {children}
      </div>
      {error && <p className="text-rose pb-2 text-rose-500">{error}</p>}
    </div>
  );
}

function InputField({ children, error }) {
  return (
    <div className="w-full">
      {children}
      {error && <p className="text-rose pb-2 text-rose-500">{error}</p>}
    </div>
  );
}

function checkItNumber(str) {
  if (!str) return true;
  const number = "0123456789";

  for (const char of str) {
    if (!number.includes(char)) {
      return false;
    }
  }

  if (str.length > 14) return false;

  return true;
}

export default AddressForm;
