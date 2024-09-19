import Image from "next/image";
import Link from "next/link";
import avatarImgDefault from "./../../../assets/authors/Avatar_hohenheim.webp";

function NavAvater({ img = avatarImgDefault }) {
  return (
    <>
      <div
        htmlFor="avatar-menu"
        className="size-6 s310:size-10 s310:border border-gray-400 text-lg flex items-center justify-center rounded-full duration-75 border-0 relative cursor-pointer group"
      >
        <input
          type="text"
          className="peer w-0 fixed top-0 left-0 overflow-hidden"
          readOnly
          id="avatar-menu"
        />
        <label className="h-full w-full cursor-pointer" htmlFor="avatar-menu">
          <Image
            src={img}
            alt="avatar-img"
            width={500}
            height={500}
            className="w-full h-full rounded-full"
          />
        </label>
        <label className="absolute left-0 top-0 h-full w-full bg-black rounded-full cursor-pointer hidden peer-focus:block opacity-0"></label>

        <div className="bg-white absolute right-0  s1230:left-1/2 text-[#333333] s1230:-translate-x-1/2 top-[120%] border w-24 md:w-32 flex flex-col p-3 overflow-hidden scale-y-0 duration-200 hover:scale-y-100 peer-focus:scale-y-100 origin-top z-40 rounded-sm">
          <Link
            href="/profile"
            className="hover:text-primary text-xs sm:text-sm md:text-base hover:bg-[#eeeeee] px-2 py-1 rounded-full flex items-center justify-center"
          >
            Profile
          </Link>
          <button className="text-left hover:text-primary text-xs sm:text-sm md:text-base hover:bg-[#eeeeee] px-2 py-1 rounded-full flex items-center justify-center">
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
export default NavAvater;
