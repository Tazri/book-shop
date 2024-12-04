import React from "react";

const allBadge = {
  processing: (
    <p className="border p-0.5 px-2 border-orange-600 text-orange-600 w-fit text-xs s250:text-sm duration-150">
      Proccessing
    </p>
  ),

  approved: (
    <p className="border p-0.5 px-2 border-green-600 text-green-600 w-fit text-xs s250:text-sm duration-150">
      Approved
    </p>
  ),
  onShipping: (
    <p className="border p-0.5 px-2 border-blue-600 text-blue-600 w-fit text-xs s250:text-sm duration-150">
      On Shipping
    </p>
  ),

  shipped: (
    <p className="border p-0.5 px-2 border-indigo-600 text-indigo-600 w-fit text-xs s250:text-sm duration-150">
      Shipped
    </p>
  ),
  completed: (
    <p className="border p-0.5 px-2 border-emerald-600 text-emerald-600 w-fit text-xs s250:text-sm duration-150">
      Completed
    </p>
  ),

  cancelled: (
    <p className="border p-0.5 px-2 border-red-600 text-red-600 w-fit text-xs s250:text-sm duration-150">
      Cancelled
    </p>
  ),

  returned: (
    <p className="border p-0.5 px-2 border-rose-600 text-rose-600 w-fit text-xs s250:text-sm duration-150">
      Returned
    </p>
  ),
};

function OrderStatusBadge({ status = "completed" }) {
  return allBadge[status];
}

export default OrderStatusBadge;
