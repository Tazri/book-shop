import { SlMenu } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import HeaderProfileAvaterMenu from "./HeaderProfileAvaterMenu";

function LayoutHeader({ sidebarOpen = () => {} }) {
  return (
    <div className="w-full p-2 border-b flex items-center justify-between text-[#444444]">
      <button onClick={sidebarOpen} className="text-xl">
        <SlMenu />
      </button>

      <HeaderProfileAvaterMenu />
    </div>
  );
}

export default LayoutHeader;
