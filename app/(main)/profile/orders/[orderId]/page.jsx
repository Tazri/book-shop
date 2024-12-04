import OrderStatusBadge from "@/components/profilePage/ProfileOrdersPage/OrderStatusBadge";
import OrderCancelModal from "@/components/profilePage/ProfileOrdersPage/SingleOrderPage/OrderCancelModal";
import OrderTable from "@/components/profilePage/ProfileOrdersPage/SingleOrderPage/OrderTable";
import React from "react";

const cancelStatus = ["processing", "approved"];

function SingleOrderPage({ params }) {
  const status = "processing";
  return (
    <div className="px-2 pb-5 pt-2 md:border-t md:border-t-primary flex-col gap-2 flex duration-150 border md:border-0">
      <div>
        <h3 className="text-[#444444] text-xs  s200:text-sm  s320:text-base s410:text-lg s450:text-xl duration-150">
          Order ID: {params?.orderId}
        </h3>
        <p className="text-[0.6rem] s185:text-xs s320:text-sm s450:text-base text-[#444444] duration-150">
          Total Products : 20 items
        </p>
        <p className="text-[0.6rem] s185:text-xs s320:text-sm s450:text-base text-[#444444] duration-150">
          Order Date: 22 Sep 2024
        </p>
      </div>

      <div className="flex flex-col gap-0.5">
        <OrderStatusBadge status={status} />
      </div>

      <div className="overflow-x-scroll py-3">
        <OrderTable />
      </div>

      <div>
        <h3 className="text-[#444444] text-xs  s200:text-sm  s320:text-base s410:text-lg s450:text-xl duration-150">
          Address
        </h3>
        <p className="text-[0.6rem] s185:text-xs s320:text-sm s450:text-base text-[#444444] duration-150">
          City : Dhaka
        </p>

        <p className="text-[0.6rem] s185:text-xs s320:text-sm s450:text-base text-[#444444] duration-150 mb-1">
          Area : Nikonjo
        </p>

        <textarea
          readOnly
          className="text-[0.6rem] s185:text-xs s320:text-sm s450:text-base text-[#444444] duration-150 min-h-48 focus:outline-none border border-[#bbbbbb] rounded-sm p-1 resize-none bg-[#eeeeee] max-w-56 w-full"
          value={
            "John Doe\n1234 Elm Street\nApt 567\nDowntown District\nSpringfield, IL\n62704\nUSA"
          }
        ></textarea>
      </div>

      {cancelStatus.includes(status) ? (
        <div>
          <label
            htmlFor={params?.orderId}
            className="text-white w-full block text-center select-none cursor-pointer bg-red-600 py-1 px-2"
          >
            Cancel Order
          </label>
          <OrderCancelModal id={params?.orderId} />
        </div>
      ) : null}
    </div>
  );
}

export default SingleOrderPage;
