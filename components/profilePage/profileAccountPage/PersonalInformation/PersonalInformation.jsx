"use client";
import ProfileAccountHeader from "../shared/ProfileAccountHeader";
import ProfileDisplayField from "../shared/ProfileDisplayField";
import UpdateButton from "../shared/UpdateButton";
import PersonalInformationForm from "./PersonalInformationForm";
import { useState } from "react";

function PersonalInformation() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <ProfileAccountHeader up>Personal Information</ProfileAccountHeader>

      {!isEdit ? (
        <div className="flex flex-col gap-3">
          <ProfileDisplayField name={"Name"} value={"Ans Anonymo"} />
          <ProfileDisplayField name={"Email"} value={"ans.anonymo@gmail.com"} />
          <ProfileDisplayField name={"Phone"} value={"01888430193"} />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <PersonalInformationForm
            name={"Ans Anonymo"}
            email={"ans.anonymo@gmail.com"}
            phone={"01888430193"}
            close={() => setIsEdit(false)}
          />
        </div>
      )}

      {!isEdit ? <UpdateButton update={() => setIsEdit((s) => !s)} /> : null}
    </>
  );
}

export default PersonalInformation;
