"use client";
import React, { useEffect, useState } from "react";
import ProfileAccountHeader from "../shared/ProfileAccountHeader";
import ProfileDisplayField from "../shared/ProfileDisplayField";
import AddressInformationForm from "./AddressInformationForm";
import UpdateButton from "../shared/UpdateButton";
import { getDemoCity } from "@/data/demoCity";

function AddressInformation() {
  const [isEdit, setIsEdit] = useState(false);
  const [allCity, setAllCity] = useState([]);

  useEffect(() => {
    const allcityData = getDemoCity();
    setAllCity(allcityData);
  }, []);

  return (
    <>
      <ProfileAccountHeader>Address</ProfileAccountHeader>

      {!isEdit ? (
        <div className="flex flex-col gap-3">
          <ProfileDisplayField name={"City"} value={"Feni"} />
          <ProfileDisplayField name={"Area"} value={"Mohipal"} />

          {/** address details */}
          <div className="flex flex-col gap-1">
            <p className="text-[#222222]">Address Details </p>
            <textarea
              readOnly
              className="border border-[#cccccc] p-2 bg-[#eeeeee] text-[#444444] focus:outline-none resize-none h-48"
              value={
                "John Doe \n1234 Elm Street\nApt 567\nDowntown District\nSpringfield, IL\n62704\nUSA"
              }
            ></textarea>
          </div>
        </div>
      ) : (
        <AddressInformationForm
          address={
            "John Doe \n1234 Elm Street\nApt 567\nDowntown District\nSpringfield, IL\n62704\nUSA"
          }
          city="dhakaid"
          area="kilkhetid"
          allCity={allCity}
          close={() => setIsEdit(false)}
        />
      )}

      {isEdit ? null : <UpdateButton update={() => setIsEdit(true)} />}
    </>
  );
}

export default AddressInformation;
