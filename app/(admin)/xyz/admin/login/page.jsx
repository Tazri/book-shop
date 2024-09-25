import Link from "next/link";
import React from "react";

function AdminLoginPage() {
  const className =
    "w-full border focus:outline-none p-2 text-[#444444] text-sm";
  return (
    <div className="h-dvh flex justify-center items-center px-3 flex-col gap-2">
      <Link className="text-center text-primary text-2xl mb-2" href="/">
        PageTurner
      </Link>
      <form className="border w-full max-w-lg p-3 shadow-md flex gap-3 flex-col">
        <InputField fieldName="User" id="admin-user">
          <input id="admin-user" type="text" className={`${className}`} />
        </InputField>

        <InputField fieldName="Password" id="admin-password">
          <input id="admin-password" type="text" className={`${className}`} />
        </InputField>

        <button className="bg-primary text-white rounded-sm py-1">
          {" "}
          Log In{" "}
        </button>
      </form>
    </div>
  );
}

function InputField({ fieldName, id, children }) {
  return (
    <div className="flex flex-col gap-0.5 text-sm">
      <label htmlFor={id} className="text-[#333333] uppercase">
        {fieldName}
      </label>
      <div>{children}</div>
    </div>
  );
}

export default AdminLoginPage;
