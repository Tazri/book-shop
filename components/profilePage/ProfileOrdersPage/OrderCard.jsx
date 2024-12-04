import Link from "next/link";
import OrderStatusBadge from "./OrderStatusBadge";

function OrderCard({ status = "processing" }) {
  return (
    <div className="border p-1 s420:p-2 space-y-3">
      <div>
        <h3 className="text-[#444444] text-xs  s200:text-sm  s320:text-base s410:text-lg s450:text-xl duration-150">
          Order ID: 47135258723093
        </h3>
        <p className="text-[0.6rem] s185:text-xs s320:text-sm s450:text-base text-[#444444] duration-150">
          Total Products : 20 items
        </p>
        <p className="text-[0.6rem] s185:text-xs s320:text-sm s450:text-base text-[#444444] duration-150">
          Order Date: 22 Sep 2024
        </p>
        <p className="text-[0.6rem] s185:text-xs s320:text-sm s450:text-base text-[#444444] duration-150">
          Total Price : <span className="text-primary">334$</span>
        </p>
      </div>

      <div className="flex flex-col gap-0.5">
        <OrderStatusBadge status={status} />
      </div>

      <Link
        href="/profile/orders/47135258723093"
        className="p-1 px-1.5 s250:px-2 s320:px-3 bg-primary text-white block w-fit rounded-sm hover:opacity-90 duration-150 text-xs s280:text-sm s420:text-base"
      >
        Details
      </Link>
    </div>
  );
}

export default OrderCard;
