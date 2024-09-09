import ProfileNameBox from "./ProfileNameBox";
import ProfileNavMenu from "./ProfileNavMenu";

function ProfileSideNavigation() {
  return (
    <div className="flex-grow max-w-none md:max-w-56 lg:max-w-64 flex flex-col gap-7 duration-150">
      <ProfileNameBox />
      <ProfileNavMenu />
    </div>
  );
}

export default ProfileSideNavigation;
