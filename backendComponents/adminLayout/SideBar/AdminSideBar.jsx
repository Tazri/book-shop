import { RxCross2 } from "react-icons/rx";
import SubMenu from "./SubMenu";
import allSidebarMenuLink from "./allSidebarMenuLink";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import { adminLogoutApi } from "@/api/backend/backendAuth";
import { useRouter } from "next/navigation";

function AdminSideBar({ isOpen = false, sidebarClose = () => {} }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const router = useRouter();

  const handleSubMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const logout = async () => {
    toast.dismiss();
    setIsLogoutLoading(true);
    try {
      const response = await adminLogoutApi();

      if (response === null) {
        toast.error("Something went wrong...");
      } else {
        const json = await response.json();
        const status = response.status;

        if (status === 301) {
          router.push(json?.redirectLink);
        } else {
          toast.error("Something went wrong.");
        }
      }
    } catch (err) {
      console.log(err.message);
      toast.error("something wrong.");
    } finally {
      setIsLogoutLoading(false);
    }
  };

  return (
    <>
      {isOpen ? (
        <div
          className="fixed top-0 left-0 w-dvw h-dvh bg-black opacity-45 z-50 block md:hidden"
          onClick={sidebarClose}
        ></div>
      ) : null}

      <div
        className={`bg-slate-800 text-white overflow-hidden duration-500 max-w-60 fixed top-0 left-0 z-50 h-full md:relative ${
          isOpen ? "-translate-x-0 w-full" : "-translate-x-full md:w-0"
        }`}
      >
        <div className="flex justify-between items-center border-b p-2 border-slate-700">
          <span className="text-primary">PageTurner</span>
          <button onClick={sidebarClose}>
            <RxCross2 />
          </button>
        </div>

        {/* other stuf */}
        <div className="p-2 mt-2 flex flex-col gap-1">
          {allSidebarMenuLink.map((menu, index) => {
            return (
              <SubMenu
                name={menu.name}
                links={menu.allLinks}
                Icon={menu.Icon}
                key={index + menu.name}
                active={activeIndex === index}
                onClick={() => handleSubMenuClick(index)}
              />
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 p-2 w-full">
          <button
            disabled={isLogoutLoading}
            onClick={logout}
            className="flex items-center gap-1 hover:bg-slate-600 p-2 w-full disabled:cursor-not-allowed"
          >
            <span>
              <CiLogout />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSideBar;
