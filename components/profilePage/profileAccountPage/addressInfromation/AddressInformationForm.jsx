"use client";
import React, { useEffect, useState } from "react";
import CancelAndSaveButton from "../shared/CancelAndSaveButton";
import AccountInputField from "../shared/AccountInputField";
import { useForm } from "react-hook-form";

function AddressInformationForm({
  close = () => {},
  address: propAddress = "",
  city: propCity = "",
  area: propArea = "",
  allCity = [],
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });

  const [address, setAddress] = useState(propAddress);
  const [city, setCity] = useState(propCity);
  const [area, setArea] = useState(propArea);
  const [isSame, setIsSame] = useState(true);

  useEffect(() => {
    if (address === propAddress && city === propCity && area === propArea) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [propCity, propArea, propAddress, address, city, area]);

  const handleCity = (e) => {
    const value = e.target.value;
    setValue("area", "");
    setArea("");
    setCity(value);
  };

  const handleArea = (e) => {
    const value = e.target.value;
    setArea(value);
  };

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

  const submitAction = (formData) => {
    console.log(formData);
  };

  const selectedCity = allCity?.find(
    (singleCity) => singleCity?.id === city
  ) ?? { area: [] };

  const areas = selectedCity?.area;

  const selectClass =
    "w-full bg-transparent p-2 focus:outline-none cursor-pointer text-[#222222] duration-150";

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitAction)}>
      <AccountInputField
        error={errors["city"]?.message}
        name={"City"}
        id="profile-city"
      >
        <div
          className={`w-full pr-3 bg-[#eeeeee] ${
            errors["city"]?.message ? "border-rose-600 border" : ""
          }`}
        >
          <select
            {...register("city", {
              validate: (value) => (value === "" ? "Please select city" : true),
            })}
            className={`${selectClass}`}
            id="profile-city"
            value={city}
            onChange={handleCity}
          >
            <option value="">Select City</option>
            {allCity?.map((cityObj) => {
              return (
                <option key={cityObj?.id} value={cityObj?.id}>
                  {cityObj?.name}
                </option>
              );
            })}
          </select>
        </div>
      </AccountInputField>

      <AccountInputField
        error={errors["area"]?.message}
        name={"Area"}
        id="profile-area"
      >
        <div
          className={`w-full pr-3 bg-[#eeeeee] ${
            errors["area"]?.message ? "border-rose-600 border" : ""
          }`}
        >
          <select
            {...register("area", {
              validate: (value) => (value === "" ? "Please select area" : true),
            })}
            className={`${selectClass}`}
            id="profile-city"
            value={area}
            onChange={handleArea}
          >
            <option value="">Select Area</option>

            {areas?.map((area) => {
              return (
                <option key={area?.id} value={area?.id}>
                  {area?.name}
                </option>
              );
            })}
          </select>
        </div>
      </AccountInputField>

      <AccountInputField
        error={errors["address"]?.message}
        id="profile-address"
        name="Address Details"
      >
        <textarea
          {...register("address", {
            validate: (value) => {
              return value.length < 10 || value.length > 100
                ? "Address details should be between 10 to 100 characters"
                : true;
            },
          })}
          id="profile-address"
          className="border border-[#cccccc] p-2 text-[#222222] focus:outline-none resize-none h-48"
          onChange={handleAddress}
          value={address}
        ></textarea>
      </AccountInputField>

      <CancelAndSaveButton disabled={isSame} cancel={close} />
    </form>
  );
}

export default AddressInformationForm;
