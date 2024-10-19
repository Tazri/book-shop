"use client";
import LayoutHeader from "@/backendComponents/adminLayout/layoutHeader/LayoutHeader";
import AdminSideBar from "@/backendComponents/adminLayout/SideBar/AdminSideBar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-screen flex">
      <Toaster position="top-center" />
      <AdminSideBar isOpen={isOpen} sidebarClose={() => setIsOpen(false)} />

      <div className="w-full duration-150 flex flex-col">
        <LayoutHeader sidebarOpen={() => setIsOpen(!isOpen)} />
        <div className="w-full h-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
