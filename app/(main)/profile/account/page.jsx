import AddressInformation from "@/components/profilePage/profileAccountPage/addressInfromation/AddressInformation";
import PasswordInformation from "@/components/profilePage/profileAccountPage/PasswordInformation/PasswordInformation";
import PersonalInformation from "@/components/profilePage/profileAccountPage/PersonalInformation/PersonalInformation";
import ProfilePictureForm from "@/components/profilePage/profileAccountPage/ProfilePictureForm/ProfilePictureForm";
import React from "react";

function ProfileAccountPage() {
  return (
    <div className="px-1 md:px-4 pb-5 pt-3 border-t-0 md:border-t md:border-t-primary flex-col gap-2 flex duration-150">
      <PersonalInformation />
      <AddressInformation />
      <ProfilePictureForm />
      <PasswordInformation />
    </div>
  );
}

export default ProfileAccountPage;
