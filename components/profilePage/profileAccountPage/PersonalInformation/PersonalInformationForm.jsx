"use client";
import AccountInputField from "../shared/AccountInputField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from "@/libs/validation";
import CancelAndSaveButton from "../shared/CancelAndSaveButton";

function PersonalInformationForm({
  close = () => {},
  name: nameProps = "Anms Anonymo",
  phone: phoneProps = "01888430193",
  email: emailProps = "ans.anonymo@email.com",
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState(nameProps);
  const [phone, setPhone] = useState(phoneProps);
  const [email, setEmail] = useState(emailProps);
  const err = "";

  const handleFormData = (formData) => {
    console.log(formData);
  };

  const handleName = (e) => {
    const value = e.target.value;
    const finalValue = value
      .trim()
      .split(" ")
      .filter((char) => char)
      .join(" ");

    if (value.length === 1 && value !== " ") {
      setName(value);
      return;
    }

    const lastCharValue = value[value.length - 1];

    if (lastCharValue === " ") {
      setName(finalValue + " ");
    } else {
      setName(finalValue);
    }
  };

  const handlePhone = (e) => {
    const value = e.target.value;
    const digits = "0123456789";
    let allNumber = true;

    for (const char of value) {
      if (!digits.includes(char)) {
        allNumber = false;
        break;
      }
    }

    if (allNumber) {
      setPhone(value);
    } else {
      setPhone(phone);
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    let hasSpace = false;

    for (const char of value) {
      if (char === " ") {
        hasSpace = true;
        break;
      }
    }

    if (hasSpace) {
      setEmail(email);
    } else {
      setEmail(value);
    }
  };

  return (
    <form
      className="flex flex-col gap-3"
      onClick={handleSubmit(handleFormData)}
    >
      <AccountInputField
        name={"Name"}
        id="profile-name"
        error={errors["name"]?.message}
      >
        <input
          {...register("name", {
            validate: (value) => {
              const check = isValidName(value);

              return check ? check : true;
            },
          })}
          id="profile-name"
          name="name"
          className={`border focus:outline-none p-2 text-[#222222] ${
            errors["name"] ? "border-rose-600" : ""
          }`}
          type="text"
          value={name}
          onChange={handleName}
        />
      </AccountInputField>

      <AccountInputField
        name={"Email"}
        id="profile-email"
        error={errors["email"]?.message}
      >
        <input
          {...register("email", {
            required: "Please enter email.",
            validate: (value) => {
              const check = isValidEmail(value);

              return check ? check : true;
            },
          })}
          onChange={handleEmail}
          id="profile-email"
          name="email"
          className={`border focus:outline-none p-2 text-[#222222] ${
            errors["email"] ? "border-rose-600" : ""
          }`}
          type="text"
          value={email}
        />
      </AccountInputField>

      <AccountInputField
        name={"Phone"}
        id="profile-phone"
        error={errors["phone"]?.message}
      >
        <input
          {...register("phone", {
            required: "Please enter phone number",
            validate: (value) => {
              const check = isValidPhoneNumber(value);

              return check ? check : true;
            },
          })}
          onChange={handlePhone}
          id="profile-phone"
          name="phone"
          className={`border focus:outline-none p-2 text-[#222222] ${
            errors["phone"] ? "border-rose-600" : ""
          }`}
          type="text"
          value={phone}
        />
      </AccountInputField>

      <CancelAndSaveButton cancel={close} />
    </form>
  );
}

export default PersonalInformationForm;
