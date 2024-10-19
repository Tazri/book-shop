"use client";
import { adminResetPasswordAPI } from "@/api/backend/backendAuth";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import { isValidPassword } from "@/libs/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

function ResetPasswordForm({ token }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    trigger,
  } = useForm();

  const formAction = async (formData) => {
    const payload = {
      token,
      password: formData.password,
    };

    setLoading(true);
    try {
      const response = await adminResetPasswordAPI(payload);
      const json = await response.json();
      const status = response.status;

      toast.dismiss();

      // start
      if (status === 200) {
        toast.success(json?.msg);
        router.push("/xyz/admin/login");
      }
      // if token is not valid or password is not valid
      else if (status === 400) {
        toast.error("Link is expired. Please try generate another link.");
        router.push("/xyz/admin/login");
      } else {
        toast.error("Something went wrong.");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.dismiss();
      toast.error("Something went wrong.");
      console.log(err);
    }
  };

  const inputClassName =
    "border w-full mt-1 px-2 py-0.5 focus:outline-none focus:border-primary  text-[#444444]";
  return (
    <form
      onSubmit={handleSubmit(formAction)}
      className="mx-auto my-auto flex flex-col gap-4"
    >
      <InputField
        id="password"
        name="New Password"
        info="Please create strong password."
        error={errors["password"]?.message}
      >
        <div className="relative">
          <button
            onClick={() => setShow(!show)}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444444]"
          >
            {show ? <FiEye /> : <FiEyeOff />}
          </button>

          <input
            {...register("password", {
              validate: (value) => {
                const check = isValidPassword(value);
                return check ? check : true;
              },
              onChange: () => {
                if (isSubmitted) {
                  trigger(["repassword"]);
                }
              },
            })}
            id="password"
            className={`${inputClassName} ${
              errors["password"] ? "border-red-600" : "border-[#888888]"
            }`}
            placeholder="theStr0gestP@ssw0rd"
            type={show ? "text" : "password"}
          />
        </div>
      </InputField>

      <InputField
        id="retypepassword"
        name="Confirm Password"
        info="Confirm your new password."
        error={errors["repassword"]?.message}
      >
        <div className="relative">
          <button
            onClick={() => setShow(!show)}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444444]"
          >
            {show ? <FiEye /> : <FiEyeOff />}
          </button>

          <input
            {...register("repassword", {
              validate: (value) => {
                return watch("password") === value
                  ? true
                  : "Password does not matched";
              },
            })}
            id="retypepassword"
            className={`${inputClassName} ${
              errors["repassword"] ? "border-red-600" : "border-[#888888]"
            }`}
            type={show ? "text" : "password"}
            placeholder="make sure password are matched"
          />
        </div>
      </InputField>

      <button
        disabled={loading}
        className="bg-primary text-white px-3 py-1 rounded-sm text-center flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-90"
      >
        {loading ? <ButtonSpinner /> : "Reset Password"}
      </button>
    </form>
  );
}

function InputField({ id, name, info, children, error }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-[#333333]">
        {name}
        <span className="text-primary">*</span>
      </label>
      <p className="text-xs text-[#555555]">{info}</p>
      {children}
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}

export default ResetPasswordForm;
