import AddressInformation from "@/components/profilePage/profileAccountPage/addressInfromation/AddressInformation";
import PersonalInformation from "@/components/profilePage/profileAccountPage/PersonalInformation/PersonalInformation";
import React from "react";

function ProfileAccountPage() {
  return (
    <div className="px-4 pb-5 pt-3 border-t border-t-primary flex-col gap-2 flex">
      <PersonalInformation />
      <AddressInformation />
    </div>
  );
}

export default ProfileAccountPage;
