import AdminSingleAuthorLoader from "@/backendComponents/adminSingleAuthorPage/AdminSingleAuthorLoader";
import AdminBackButton from "@/backendComponents/shared/others/AdminBackButton";
import React from "react";

function AdminSingleAuthorPage({ params: { id } }) {
  return (
    <div className="p-2">
      <AdminBackButton
        path={"/xyz/admin/authors?page=1&perPage=10"}
        text="To see All Authors"
      />
      <h2 className="text-2xl text-[#333333] mt-3">Single Author</h2>

      <div className="border p-2 my-4 max-w-7xl">
        <AdminSingleAuthorLoader id={id} />
      </div>
    </div>
  );
}

export default AdminSingleAuthorPage;
