import MenuDrawer from "@/components/profilePage/MenuDrawer";
import ProfileSideNavigation from "@/components/profilePage/ProfileSideNavigation";
import React from "react";

function ProfileLayout({ children }) {
  return (
    <div className="flex-grow container mx-auto p-1 gap-4 lg:gap-6 flex flex-col md:flex-row my-5">
      <ProfileSideNavigation />
      <div className="flex-grow border">{children}</div>
      <MenuDrawer />
    </div>
  );
}

export default ProfileLayout;
