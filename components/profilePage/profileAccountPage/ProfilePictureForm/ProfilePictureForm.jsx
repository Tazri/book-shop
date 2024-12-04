import Image from "next/image";
import ProfileAccountHeader from "../shared/ProfileAccountHeader";
import demoProfilePicture from "./../../../../assets/authors/Avatar_hohenheim.webp";
import { TbPhotoPlus } from "react-icons/tb";

function ProfilePictureForm() {
  return (
    <>
      <ProfileAccountHeader>Profile Picture</ProfileAccountHeader>
      <div className="flex flex-col gap-3">
        <input
          id="profile-image-uploader"
          type="file"
          accept=".png,.jpeg,.jpg"
          className="hidden"
        />
        <label
          htmlFor="profile-image-uploader"
          className="cursor-pointer relative rounded-full size-16 s350:size-20 overflow-hidden group duration-150"
        >
          <div className="h-full w-full absolute left-0 right-0 bg-[#0000005b] duration-150 scale-0 group-hover:scale-100 flex items-center justify-center">
            <TbPhotoPlus className="text-white text-2xl" />
          </div>
          <Image
            width={500}
            height={500}
            src={demoProfilePicture}
            alt="profile-picture"
            className="h-full w-full rounded-full"
          />
        </label>
        <p className="text-[0.65rem] s220:text-xs text-[#333333] duration-150">
          (PNG/JPG/JPEG, Max. 1.5MB)
        </p>
      </div>
    </>
  );
}

export default ProfilePictureForm;
