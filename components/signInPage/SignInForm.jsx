"use client";
import React, { useEffect, useState } from "react";
import SignInInputField from "./SignInInputField";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { isValidEmail, isValidPassword } from "@/libs/validation";
import { useDispatch } from "react-redux";
import { removeOTPEmailAction } from "@/redux/profileSlice/profileSlice";

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();

  const submitAction = (formData) => {
    console.log(formData);
  };

  useEffect(() => {
    dispatch(removeOTPEmailAction());
  }, [dispatch]);

  return (
    <form
      className="flex-grow flex flex-col gap-3.5 py-2 w-full lg:w-auto  self-center lg:self-start px-1 lg:max-w-none  xl:my-auto"
      onSubmit={handleSubmit(submitAction)}
    >
      <div className="text-center mb-4">
        <h2 className="text-xl s320:text-2xl s500:text-3xl xl:text-4xl duration-150 text-[#222222]">
          <span className="text-primary">Sign</span> In
        </h2>
        <p className="text-[0.65rem] s340:text-xs s500:text-sm xl:text-base text-[#444444] duration-150 mt-0.5">
          Don{"'"}t Share Your Sign In Information with Others
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <SignInInputField
          title="Your Email Address"
          info="The email you used for register."
          required
          error={errors["email"]?.message}
        >
          <input
            {...register("email", {
              validate: (value) => {
                const check = isValidEmail(value);
                return check ? check : true;
              },
            })}
            type="email"
            className={`border w-full py-1 px-2.5 bg-[#ededed] focus:outline-none duration-150 text-[#333333] rounded-sm text-xs s260:text-sm s410:text-base xl:text-lg ${
              errors["email"]?.message
                ? "border-red-600 focus:border-red-600"
                : "focus:border-primary"
            }`}
            placeholder="ans.anonymo@gmail.com"
          />
        </SignInInputField>

        <SignInInputField
          title="Enter Your Password"
          info="Password atleast 8 letter. It must contain 1 letter and 1 number."
          required
          error={errors["password"]?.message}
        >
          <div className="relative ">
            <button
              type="button"
              className="text-xs s260:text-sm s410:text-lg xl:text-xl absolute right-3 top-1/2 -translate-y-1/2 text-[#444444]"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <LuEye /> : <LuEyeOff />}
            </button>

            <input
              {...register("password", {
                validate: (value) => {
                  const check = isValidPassword(value);
                  return check ? check : true;
                },
              })}
              className={`border w-full py-1 px-2.5 bg-[#ededed] focus:outline-none duration-150 text-[#333333] rounded-sm text-xs s260:text-sm s410:text-base xl:text-lg ${
                errors["password"]?.message
                  ? "border-red-600 focus:border-red-600"
                  : "focus:border-primary"
              }`}
              placeholder="Anms@n0nym0"
              type={showPassword ? "text" : "password"}
            />
          </div>
        </SignInInputField>
      </div>

      <p className="text-[#555555] text-[0.6rem] s220:text-[0.65rem] s240:text-xs xl:text-base s320:text-sm s410:text-base duration-150">
        Don{"'"}t have an account yet ?{" "}
        <Link
          className="text-primary hover:underline cursor-pointer whitespace-nowrap"
          href="/signup"
        >
          Sign Up
        </Link>
      </p>

      {/** sign in and forget password */}
      <button className="bg-primary text-white py-1 text-xs s250:text-sm rounded-sm s340:text-base xl:text-lg duration-150">
        Sign in
      </button>

      <Link
        href="forget-pasword"
        className="text-right text-xs  s250:text-sm xl:text-base text-[#555555] hover:underline duration-150"
      >
        Forgot Password
      </Link>
    </form>
  );
}

export default SignInForm;
