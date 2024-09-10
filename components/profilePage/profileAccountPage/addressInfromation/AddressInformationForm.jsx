"use client";
import React, { useState } from "react";
import CancelAndSaveButton from "../shared/CancelAndSaveButton";
import AccountInputField from "../shared/AccountInputField";

function AddressInformationForm({
  close = () => {},
  address: propAddress = "",
  city: propCity = "",
  area: propArea = "",
}) {
  const [address, setAddress] = useState(propAddress);
  const [city, setCity] = useState(propCity);
  const [area, setArea] = useState(propArea);

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

  return (
    <form className="flex flex-col gap-3">
      <AccountInputField name={"City"} id="profile-city">
        <AddressSelect id="profile-city">
          <option value="">Select City</option>
          <option value={"value"}>Feni</option>
        </AddressSelect>
      </AccountInputField>

      <AccountInputField name={"Area"} id="profile-area">
        <AddressSelect id="profile-area">
          <option value="">Select City</option>
          <option value={"value"}>Mohipal</option>
        </AddressSelect>
      </AccountInputField>

      <AccountInputField id="profile-address" name="Address Details">
        <textarea
          id="profile-address"
          className="border border-[#cccccc] p-2 text-[#222222] focus:outline-none resize-none h-48"
          onChange={handleAddress}
          value={address}
        ></textarea>
      </AccountInputField>

      <CancelAndSaveButton cancel={close} />
    </form>
  );
}

function AddressSelect({ children, ...others }) {
  return (
    <div className="w-full pr-3 bg-[#eeeeee]">
      <select
        className="w-full bg-transparent p-2 focus:outline-none cursor-pointer text-[#222222] duration-150"
        {...others}
      >
        {children}
      </select>
    </div>
  );
}

export default AddressInformationForm;
