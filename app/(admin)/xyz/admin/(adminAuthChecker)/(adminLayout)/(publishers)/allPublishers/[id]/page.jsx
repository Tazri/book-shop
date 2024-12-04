import AdminPublisherLoader from "@/backendComponents/adminSinglePublisherPage/AdminPublisherLoader";
import AdminBackButton from "@/backendComponents/shared/others/AdminBackButton";
import React from "react";

function AdminSinglePublisher({ params: { id } }) {
  return (
    <div className="p-2">
      <AdminBackButton
        path={"/xyz/admin/allPublishers?page=1&perPage=10"}
        text="To see All Publishers"
      />
      <h2 className="text-2xl text-[#333333] mt-3">Single Publisher</h2>
      <div className="border p-2 my-4 max-w-7xl">
        <AdminPublisherLoader id={id} />
      </div>
    </div>
  );
}

export default AdminSinglePublisher;
