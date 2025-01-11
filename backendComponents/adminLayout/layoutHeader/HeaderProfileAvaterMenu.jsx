import { adminLogoutApi } from "@/api/backend/backendAuth";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";

function HeaderProfileAvaterMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const router = useRouter();
  const menuRef = useRef({
    mouseInMenu: false,
  });

  const profileButtonHandle = () => {
    setShowMenu(false);
  };

  const logoutHandle = async () => {
    setIsLogoutLoading(!isLogoutLoading);

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

  useEffect(() => {
    const listener = window.addEventListener("click", () => {
      const mouseInMenu = menuRef.current.mouseInMenu;

      if (!mouseInMenu) {
        setShowMenu(false);
      }
    });

    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        menuRef.current.mouseInMenu = true;
      }}
      onMouseLeave={() => {
        menuRef.current.mouseInMenu = false;
      }}
      className="relative"
    >
      <button className="text-xl" onClick={() => setShowMenu(!showMenu)}>
        <FaRegUserCircle />
      </button>
      <div
        className={`absolute top-full right-1 duration-300 bg-white text-xs min-w-28 border p-3 flex flex-col gap-1 origin-top-right ${
          showMenu ? "scale-100" : "scale-0"
        }`}
      >
        <button
          onClick={profileButtonHandle}
          className="hover:bg-primary px-2 p-1 hover:text-white text-left rounded-md"
        >
          Profile
        </button>

        <button
          onClick={logoutHandle}
          disabled={isLogoutLoading}
          className={`hover:bg-primary px-2 p-1 hover:text-white text-left rounded-md disabled:cursor-wait ${
            isLogoutLoading ? "bg-primary" : "bg-transparent"
          }`}
        >
          {isLogoutLoading ? <ButtonSpinner width={15} /> : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default HeaderProfileAvaterMenu;
