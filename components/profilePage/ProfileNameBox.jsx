import Image from "next/image";
import defaultImage from "./../../assets/authors/Avatar_hohenheim.webp";
import { menuDrawerId } from "../htmlIds/ids";
import { CiMenuFries } from "react-icons/ci";

function ProfileNameBox() {
  return (
    <div className="border p-3 flex justify-between md:justify-start gap-2 items-center">
      {/** img */}
      <div className="size-6 s500:size-8 md:size-12 rounded-full duration-150">
        <Image
          src={defaultImage}
          alt="profile-image"
          width={500}
          height={500}
          className="w-full h-full rounded-full"
        />
      </div>

      <div className="hidden md:flex flex-col text-[#555555]">
        <span className="text-sm">Hello,</span>
        <span className="text-base text-[#333333]">Ans Anonymo</span>
      </div>

      <label
        className="cursor-pointer md:hidden text-lg text-[#333333]"
        htmlFor={menuDrawerId}
      >
        <CiMenuFries />
      </label>
    </div>
  );
}

export default ProfileNameBox;
