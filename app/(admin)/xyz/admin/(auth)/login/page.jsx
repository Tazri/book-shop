"use client";
import AdminForgetModal from "@/backendComponents/adminLogInPage/AdminForgetModal";
import { isValidPassword, isValidUsername } from "@/libs/validation";
import { removeLastTimeResetLinkSendAction } from "@/redux/adminAuth/adminAuthSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LuEye } from "react-icons/lu";
import { FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import { adminLoginApi } from "@/api/backend/backendAuth";
import { useRouter } from "next/navigation";

function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // unset reset link time
  useEffect(() => {
    dispatch(removeLastTimeResetLinkSendAction());
    return () => dispatch(removeLastTimeResetLinkSendAction());
  });

  const handleClose = () => {
    setShowModal(!showModal);
    dispatch(removeLastTimeResetLinkSendAction());
  };

  const formAction = async (data) => {
    toast.dismiss();
    setLoading(true);

    try {
      // api call
      const response = await adminLoginApi(data);
      const json = await response.json();
      const status = response.status;

      // if all ok
      if (status === 200) {
        toast.success("Successfully login.");
        router.push("/xyz/admin/");
      }

      // if user or password incorrect
      else if (status === 401) {
        toast.error(json.msg);
      }

      // if too many request
      else if (status === 429) {
        toast.error(json.msg);
      }
      // others
      else {
        toast.error("Server side error.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const className =
    "w-full border focus:outline-none p-2 text-[#444444] text-sm focus:border-primary rounded-sm duration-150";
  return (
    <>
      <div className="h-dvh flex justify-center items-center px-3 flex-col gap-2 rounded-sm">
        <Link className="text-center text-primary text-2xl mb-2" href="/">
          PageTurner
        </Link>
        <form
          onSubmit={handleSubmit(formAction)}
          className="border w-full max-w-lg p-3 shadow-md flex gap-4 flex-col"
        >
          <h3 className="text-center text-xl text-[#444444] mb-1 uppercase">
            Log In
          </h3>
          <InputField
            fieldName="Username"
            id="admin-user"
            info="Enter your account username to access dashboard."
            error={errors["username"]?.message}
          >
            <input
              {...register("username", {
                validate: (value) => {
                  const check = isValidUsername(value);

                  return check ? check : true;
                },
              })}
              id="admin-user"
              type="text"
              className={`${className} ${
                errors["username"] ? "border-red-600" : "border-[#cccccc]"
              }`}
              placeholder="anms.anonymo"
            />
          </InputField>

          <InputField
            fieldName="Password"
            id="admin-password"
            info="Enter your account password."
            error={errors["password"]?.message}
          >
            <div className="relative">
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className=" absolute right-2 top-1/2 -translate-y-1/2 text-xl text-[#444444]"
              >
                {showPassword ? <LuEye /> : <FiEyeOff />}
              </button>

              <input
                {...register("password", {
                  validate: (value) => {
                    const check = isValidPassword(value);
                    return check ? check : true;
                  },
                })}
                id="admin-password"
                type={showPassword ? "text" : "password"}
                className={`${className} ${
                  errors["password"] ? "border-red-600" : "border-[#cccccc]"
                }`}
                placeholder="ans.anonymo@1234"
              />
            </div>
          </InputField>

          <button
            disabled={loading}
            className="bg-primary text-white rounded-sm py-1 flex text-center items-center justify-center disabled:opacity-90 disabled:cursor-not-allowed"
          >
            {loading ? <ButtonSpinner /> : "Log In"}
          </button>

          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="text-left w-fit text-sm text-[#444444] duration-150 hover:text-primary  cursor-pointer select-none"
          >
            Forget Password ?
          </button>
        </form>
      </div>
      {showModal ? <AdminForgetModal close={handleClose} /> : null}
    </>
  );
}

function InputField({ fieldName, id, children, info, error }) {
  return (
    <div className="flex flex-col text-sm">
      <label htmlFor={id} className="text-[#333333] uppercase">
        {fieldName}
        <span className="text-primary">*</span>
      </label>
      {info && <p className="text-[#555555] text-xs">{info}</p>}
      <div className="mt-1">{children}</div>
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}

export default AdminLoginPage;
