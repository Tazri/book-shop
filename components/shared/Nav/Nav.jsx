"use client";
import SearchBar from "./SearchBar";
import { CiShoppingCart } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { cartDrawerId, searchModalId } from "@/components/htmlIds/ids";
import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavAvater from "./NavAvater";

function Nav() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const listener = window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);
  return (
    <nav
      className={`duration-200 ${
        isTop
          ? "py-3"
          : "fixed top-0 left-0 bg-white z-50 w-full shadow-md py-2"
      }`}
    >
      <div className="flex gap-3 container mx-auto p-1 px-2 justify-between lg:justify-start flex-wrap duration-200">
        <div className="flex items-center text-sm">
          <span className="flex items-center s310:gap-2 gap-1 s310:text-xl">
            <IoBookOutline className="text-base s310:text-2xl text-primary" />{" "}
            Logo
          </span>
        </div>

        <div className="flex-grow hidden lg:block">
          <SearchBar />
        </div>

        <div className="gap-2 items-center justify-center flex">
          <Button showDot htmlFor={cartDrawerId}>
            <CiShoppingCart />
          </Button>
          <div className="lg:hidden">
            <Button htmlFor={searchModalId}>
              <ButtonIcon Icon={IoSearchOutline} />
            </Button>
          </div>

          <SignInButton />
          {/* <NavAvater /> */}
        </div>
      </div>

      {/** other drawer and modal */}
      <CartDrawer />
      <SearchModal />
    </nav>
  );
}

function SignInButton() {
  return (
    <>
      <Link
        href="/signin"
        className="size-6 s310:size-10 border-[0.1px] s310:border border-gray-400 text-lg flex s260:hidden items-center justify-center rounded-full hover:bg-primary hover:text-white duration-75 hover:border-0 relative group cursor-pointer "
      >
        <CiLogin className="text-xs s310:text-base" />
      </Link>

      <Link href="/signin" className="h-full hidden s260:block">
        <button className="bg-primary text-white h-full whitespace-nowrap py-1 lg:py-2 px-2 s310:px-3 s350:px-6 rounded-sm text-xs s310:text-sm s320:text-sm s350:text-base self-center">
          Sign In
        </button>
      </Link>
    </>
  );
}

function Button({ children, showDot = false, dotNum = 0, htmlFor = "#" }) {
  return (
    <label
      htmlFor={htmlFor}
      className="size-6 s310:size-10 border-[0.1px] s310:border border-gray-400 text-lg flex items-center justify-center rounded-full hover:bg-primary hover:text-white duration-75 hover:border-0 relative group cursor-pointer"
    >
      {children}
      {showDot && (
        <span className="text-[7px] s310:text-[9px] size-4 bg-primary absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4 flex justify-center items-center text-white rounded-full border group-hover:border-white border-transparent duration-150 select-none">
          {dotNum}
        </span>
      )}
    </label>
  );
}

function ButtonIcon({ Icon }) {
  return <Icon className="text-xs s310:text-base" />;
}

export default Nav;
