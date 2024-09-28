"use client";
import AdminForgetModal, {
  adminForgetModalId,
} from "@/backendComponents/adminLogInPage/AdminForgetModal";
import { isValidPassword, isValidUsername } from "@/libs/validation";
import { removeLastTimeResetLinkSendAction } from "@/redux/adminAuth/adminAuthSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function AdminLoginPage() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // unset reset link time
  useEffect(() => {
    dispatch(removeLastTimeResetLinkSendAction());
    return () => dispatch(removeLastTimeResetLinkSendAction());
  });

  const handleClose = () => {
    setShowModal(!showModal);
    dispatch(removeLastTimeResetLinkSendAction());
  };

  const formAction = (data) => {
    console.log(data);
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
            <input
              {...register("password", {
                validate: (value) => {
                  const check = isValidPassword(value);
                  return check ? check : true;
                },
              })}
              id="admin-password"
              type="text"
              className={`${className} ${
                errors["password"] ? "border-red-600" : "border-[#cccccc]"
              }`}
              placeholder="ans.anonymo@1234"
            />
          </InputField>

          <button className="bg-primary text-white rounded-sm py-1">
            {" "}
            Log In{" "}
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
