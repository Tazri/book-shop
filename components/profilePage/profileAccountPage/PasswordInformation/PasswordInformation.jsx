"use client";
import React, { useState } from "react";
import ProfileAccountHeader from "../shared/ProfileAccountHeader";
import ProfileDisplayField from "../shared/ProfileDisplayField";
import PasswordInformatinForm from "./PasswordInformatinForm";
import UpdateButton from "../shared/UpdateButton";

function PasswordInformation() {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <ProfileAccountHeader>Password</ProfileAccountHeader>

      {!isEdit ? (
        <div className="flex flex-col gap-3">
          <ProfileDisplayField name="Password" value="***********" />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <PasswordInformatinForm cancel={() => setIsEdit(false)} />
        </div>
      )}

      {isEdit ? null : <UpdateButton update={() => setIsEdit(true)} />}
    </>
  );
}

export default PasswordInformation;
