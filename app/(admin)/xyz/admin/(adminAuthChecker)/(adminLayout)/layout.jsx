"use client";
import LayoutHeader from "@/backendComponents/adminLayout/layoutHeader/LayoutHeader";
import AdminSideBar from "@/backendComponents/adminLayout/SideBar/AdminSideBar";
import { useState } from "react";

function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full flex overflow-hidden">
      <AdminSideBar isOpen={isOpen} sidebarClose={() => setIsOpen(false)} />

      <div className="w-full duration-150 flex flex-col overflow-hidden">
        <LayoutHeader sidebarOpen={() => setIsOpen(!isOpen)} />

        <div className="w-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
