"use client";
import React, { useEffect, useState } from "react";
import CancelAndSaveButton from "../shared/CancelAndSaveButton";
import AccountInputField from "../shared/AccountInputField";
import { useForm } from "react-hook-form";
import AccountSelectInput from "../shared/AccountSelectInput";

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
    trigger,
  } = useForm();

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
    trigger(["area"]);
  };

  const handleArea = (e) => {
    const value = e.target.value;
    setArea(value);
    trigger(["area"]);
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
        <AccountSelectInput
          error={errors["city"]}
          {...register("city", {
            required: "Please select the city.",
            validate: (value) => (value === "" ? "Please select city" : true),
            onChange: handleCity,
            value: city,
          })}
          id="profile-city"
        >
          <option value="">Select City</option>
          {allCity?.map((cityObj) => {
            return (
              <option key={cityObj?.id} value={cityObj?.id}>
                {cityObj?.name}
              </option>
            );
          })}
        </AccountSelectInput>
      </AccountInputField>

      <AccountInputField
        error={errors["area"]?.message}
        name={"Area"}
        id="profile-area"
      >
        <AccountSelectInput
          error={errors["area"]}
          {...register("area", {
            validate: (value) => (value === "" ? "Please select area" : true),
            onChange: handleArea,
            value: area,
          })}
          id="profile-area"
        >
          <option value="">Select Area</option>

          {areas?.map((area) => {
            return (
              <option key={area?.id} value={area?.id}>
                {area?.name}
              </option>
            );
          })}
        </AccountSelectInput>
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
            onChange: handleAddress,
            value: address,
          })}
          id="profile-address"
          className="border border-[#cccccc] text-[#222222] focus:outline-none resize-none h-48 text-[0.65rem]  s200:text-xs  s240:text-sm s410:text-base p-1.5 s350:p-2 duration-150"
        ></textarea>
      </AccountInputField>

      <CancelAndSaveButton disabled={isSame} cancel={close} />
    </form>
  );
}

export default AddressInformationForm;
