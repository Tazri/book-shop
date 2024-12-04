"use client";
import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiPackage } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineReviews } from "react-icons/md";
import { usePathname } from "next/navigation";

function ProfileNavMenu() {
  const path = usePathname();

  return (
    <div className="border hidden md:block">
      <ProfileNavLink
        icon={<RxDashboard />}
        name={"Dashboard"}
        href="/profile"
        isActive={path === "/profile"}
      />

      <ProfileNavLink
        icon={<MdOutlineAccountCircle />}
        name={"Account"}
        href="/profile/account"
        isActive={path === "/profile/account"}
      />

      <ProfileNavLink
        icon={<PiPackage />}
        name="Orders"
        href="/profile/orders"
        isActive={path === "/profile/orders"}
      />

      <ProfileNavLink
        icon={<PiHeart />}
        name={"Wish List"}
        href="/profile/wishlist"
        isActive={path === "/profile/wishlist"}
      />

      <ProfileNavLink
        icon={<MdOutlineReviews />}
        name={"My Reviews"}
        href="/profile/reviews"
        isActive={path === "/profile/reviews"}
      />

      <button
        type="button"
        className="flex gap-2 items-center text-lg text-[#333333] p-4 border-b last-border-b hover:text-primary duration-150"
      >
        {" "}
        <span className="text-2xl">{<CiLogout />}</span> <span>Sign Out</span>
      </button>
    </div>
  );
}

function ProfileNavLink({
  icon = <MdOutlineAccountCircle />,
  name,
  href = "#",
  isActive,
}) {
  return (
    <Link
      href={href}
      className={`flex gap-2 items-center text-base lg:text-lg text-[#333333] lg:p-4 p-3 border-b last-border-b hover:text-primary ${
        isActive ? "text-primary" : ""
      } duration-150`}
    >
      <span className="text-xl lg:text-2xl duration-150">{icon}</span>{" "}
      <span>{name}</span>
    </Link>
  );
}

export default ProfileNavMenu;
