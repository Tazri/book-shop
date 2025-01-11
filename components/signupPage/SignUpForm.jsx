"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { isValidEmail, isValidName, isValidPassword } from "@/libs/validation";
import SignUpField from "./SignUpField";
import ButtonSpinner from "../shared/spinner/ButtonSpinner";
import { signInApi } from "@/api/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  removeOTPEmailAction,
  setOTPEmailAction,
} from "@/redux/profileSlice/profileSlice";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors, isSubmitted },
    handleSubmit,
    watch,
    trigger,
  } = useForm();
  const dispatch = useDispatch();

  const submitAction = async (formData) => {
    try {
      const bodyData = {
        name: formData.name.trim(),
        password: formData.password,
        email: formData.email,
      };

      setLoading(true);
      const response = await signInApi(bodyData);

      if (response === null) {
        toast.dismiss();
        toast.error("Something went wrong...");
        console.log("Null error...");
      } else {
        const responseJson = await response.json();
        setLoading(false);

        if (response.status === 200) {
          toast.dismiss();
          toast.success(responseJson?.msg, { duration: 4000 });

          const payload = {
            lastTimeOtpSend: responseJson?.lastTimeOtpSend,
            email: responseJson.email,
          };

          dispatch(setOTPEmailAction(payload));
          router.push("/otp");
        } else {
          toast.dismiss();
          toast.error(responseJson?.msg);
        }
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong.");
      console.log(err);
    }
  };

  const triggerRecheckPassword = () => {
    if (isSubmitted) {
      trigger(["repassword"]);
    }
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
          <span className="text-primary">Sign</span> Up
        </h2>
        <p className="text-[0.65rem] s340:text-xs s500:text-sm xl:text-base text-[#444444] duration-150 mt-0.5">
          Don{"'"}t Share Your Sign up Information with Others
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <SignUpField
          title="Your Name"
          info="It's display in your profile."
          required
          error={errors["name"]?.message}
        >
          <input
            {...register("name", {
              validate: (value) => {
                const check = isValidName(value);
                return check ? check : true;
              },
            })}
            type="text"
            className={`border w-full py-1 px-2.5 bg-[#ededed] focus:outline-none duration-150 text-[#333333] rounded-sm text-xs s260:text-sm s410:text-base xl:text-lg ${
              errors["name"]?.message
                ? "border-red-600 focus:border-red-600"
                : "focus:border-primary"
            }`}
            placeholder="ans.anonymo@gmail.com"
          />
        </SignUpField>

        <SignUpField
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
        </SignUpField>

        <SignUpField
          title="Create a Password"
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
                onChange: triggerRecheckPassword,
                onBlur: triggerRecheckPassword,
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
        </SignUpField>

        {/** retype password */}
        <SignUpField
          title="Retype Password"
          info="Make sure the password are same."
          required
          error={errors["repassword"]?.message}
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
              {...register("repassword", {
                validate: (value) => {
                  return watch("password") !== value
                    ? "Password does not match."
                    : true;
                },
                onChange: triggerRecheckPassword,
                onBlur: triggerRecheckPassword,
              })}
              className={`border w-full py-1 px-2.5 bg-[#ededed] focus:outline-none duration-150 text-[#333333] rounded-sm text-xs s260:text-sm s410:text-base xl:text-lg ${
                errors["repassword"]?.message
                  ? "border-red-600 focus:border-red-600"
                  : "focus:border-primary"
              }`}
              placeholder="Anms@n0nym0"
              type={showPassword ? "text" : "password"}
            />
          </div>
        </SignUpField>
      </div>

      <p className="text-[#555555] text-[0.6rem] s220:text-[0.65rem] s240:text-xs xl:text-base s320:text-sm s410:text-base duration-150">
        You already have an account ?{" "}
        <Link
          className="text-primary hover:underline cursor-pointer whitespace-nowrap"
          href="/signin"
        >
          Sign in
        </Link>
      </p>

      {/** sign in and forget password */}
      <button
        className="bg-primary text-white py-1 text-xs s250:text-sm rounded-sm s340:text-base xl:text-lg duration-150 flex justify-center items-center disabled:opacity-90 disabled:cursor-not-allowed cursor-pointer"
        disabled={loading}
      >
        {loading ? <ButtonSpinner /> : "Sign up"}
      </button>
    </form>
  );
}

export default SignUpForm;
