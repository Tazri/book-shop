"use client";
import { menuDrawerId } from "@/components/htmlIds/ids";
import { IoBookOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";
import { PiGear } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineReviews } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const defaultLinks = [
  {
    name: "Dashboard",
    link: "/profile",
    icon: RxDashboard,
  },

  {
    name: "Account",
    link: "/profile/account",
    icon: PiUserCircle,
  },
  {
    name: "Orders",
    link: "/profile/orders",
    icon: PiPackage,
  },
  {
    name: "Wish List",
    link: "/profile/wishlist",
    icon: PiHeart,
  },
  {
    name: "Reviews",
    link: "/profile/reviews",
    icon: MdOutlineReviews,
  },
];

function MenuDrawer({ links = defaultLinks }) {
  const path = usePathname();
  const inputRef = useRef();

  const handleLogOut = () => {
    console.log("log out");
  };

  return (
    <div className="text-gray-800">
      <input
        id={menuDrawerId}
        type="checkbox"
        className="peer hidden"
        ref={inputRef}
      />
      <label
        htmlFor={menuDrawerId}
        className="fixed top-0 left-0 h-full w-full bg-black opacity-0 peer-checked:pointer-events-auto pointer-events-none peer-checked:opacity-40 duration-100 z-50"
      ></label>

      <div className="fixed h-full bg-white top-0 right-0 z-50 shadow-md translate-x-full peer-checked:translate-x-0 duration-300 hover:text-inherit w-full s340:max-w-[340px]">
        <div className="flex items-center justify-between p-4 border-b">
          <label
            htmlFor={menuDrawerId}
            className="cursor-pointer text-lg s310:text-xl"
          >
            <IoCloseOutline />
          </label>

          <div className="flex items-center justify-center gap-2">
            Logo
            <span>
              <IoBookOutline className="text-2xl text-primary" />
            </span>
          </div>
        </div>

        <div className="p-4">
          <ul className="flex flex-col gap-2">
            {links?.map((link) => {
              return (
                <MenuLink
                  inputRef={inputRef}
                  key={link?.link}
                  href={link?.link}
                  isActive={link?.link === path}
                  Icon={link?.icon}
                >
                  {link?.name}
                </MenuLink>
              );
            })}

            {/** logout */}
            <li
              className="text-sm s310:text-base py-1 border-b hover:text-primary relative group pb-3 capitalize cursor-pointer"
              onClick={handleLogOut}
            >
              <span className="flex items-center gap-2">
                <span>
                  <CiLogout className="text-2xl" />
                </span>
                Log Out
              </span>
              <div className="w-full h-[1px] bg-primary absolute bottom-0 scale-x-0 group-hover:scale-x-100 duration-200 origin-left"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function MenuLink({ children, href, Icon, inputRef, isActive }) {
  const router = useRouter();
  const handleClick = () => {
    inputRef?.current?.click();
    router.push(href);
  };
  return (
    <li
      className={`text-sm s310:text-base py-1 border-b hover:text-primary relative group pb-3 capitalize cursor-pointer ${
        isActive ? "text-primary" : ""
      }`}
      onClick={handleClick}
    >
      <span
        href={href ? href : new Date.now()}
        className="flex items-center gap-2"
      >
        <span>
          <Icon className="text-2xl" />
        </span>
        {children}
      </span>
      <div className="w-full h-[1px] bg-primary absolute bottom-0 scale-x-0 group-hover:scale-x-100 duration-200 origin-left"></div>
    </li>
  );
}

export default MenuDrawer;
