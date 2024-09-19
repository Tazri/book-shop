import ProfileNameBox from "./ProfileNameBox";
import ProfileNavMenu from "./ProfileNavMenu";

function ProfileSideNavigation() {
  return (
    <div className="flex-grow max-w-none border-b border-primary md:border-b-0 md:min-w-56 md:max-w-56 lg:max-w-64 flex flex-col gap-7 duration-150 h-fit md:sticky top-0">
      <ProfileNameBox />
      <ProfileNavMenu />
    </div>
  );
}

export default ProfileSideNavigation;
