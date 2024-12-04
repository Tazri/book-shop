import OrderFilter from "@/components/profilePage/ProfileOrdersPage/OrderFilter";
import OrdersList from "@/components/profilePage/ProfileOrdersPage/OrdersList";
import { orderStatusColor } from "@/components/profilePage/ProfileOrdersPage/orderStatusColor";
import { redirect } from "next/navigation";
import React from "react";

function ProfileOrdersPage({ searchParams }) {
  const status = searchParams.status;
  const allStatus = orderStatusColor;

  if (
    !Object.keys(allStatus).includes(status) &&
    status !== "any" &&
    status !== undefined
  ) {
    return redirect("/profile/orders?status=any");
  }

  return (
    <div className="px-1 md:px-4 pb-5 pt-3 border-t-0 md:border-t md:border-t-primary flex-col gap-5 flex duration-150">
      <OrderFilter />
      <OrdersList searchParams={searchParams} />
    </div>
  );
}

export default ProfileOrdersPage;
