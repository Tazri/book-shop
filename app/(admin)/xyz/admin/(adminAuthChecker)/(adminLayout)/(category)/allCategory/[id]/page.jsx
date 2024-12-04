import AdminSingleCategoryLoad from "@/backendComponents/adminSingleCategoryPage/AdminSingleCategoryLoad";
import AdminSingleCatgoryDisplay from "@/backendComponents/adminSingleCategoryPage/AdminSingleCatgoryDisplay";
import AdminBackButton from "@/backendComponents/shared/others/AdminBackButton";
import Link from "next/link";
import React, { Suspense } from "react";
import { BiArrowBack } from "react-icons/bi";

function AdminCategoryPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div className="p-2">
      <AdminBackButton
        path={"/xyz/admin/allCategory"}
        text="To see All category"
      />
      <h2 className="text-2xl text-[#333333] mt-3">Single Category</h2>

      <div className="border p-2 my-4 max-w-7xl">
        <AdminSingleCategoryLoad id={params?.id} />
      </div>
    </div>
  );
}

export default AdminCategoryPage;
