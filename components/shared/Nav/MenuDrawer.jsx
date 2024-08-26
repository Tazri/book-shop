"use client";
import { menuDrawerId } from "@/components/htmlIds/ids";
import { IoBookOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";
import { PiGear } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";

const defaultLinks = [
  {
    name: "Profile",
    link: "#profile",
    icon: PiUserCircle,
  },
  {
    name: "Order",
    link: "#order",
    icon: PiPackage,
  },
  {
    name: "Cart",
    link: "#cart",
    icon: LuShoppingCart,
  },
  {
    name: "Wish List",
    link: "#wishlist",
    icon: PiHeart,
  },
  {
    name: "settings",
    link: "#settins",
    icon: PiGear,
  },
  {
    name: "Log Out",
    link: "#LogOut",
    icon: CiLogout,
  },
  {
    name: "Log In",
    link: "#login",
    icon: CiLogin,
  },
];

function MenuDrawer({ links = defaultLinks }) {
  const inputRef = useRef();

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
                  Icon={link?.icon}
                >
                  {link?.name}
                </MenuLink>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MenuLink({ children, href, Icon, inputRef }) {
  const router = useRouter();
  const handleClick = () => {
    inputRef?.current?.click();
    router.push(href);
  };
  return (
    <li
      className="text-sm s310:text-base py-1 border-b hover:text-primary relative group pb-3 capitalize cursor-pointer"
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
