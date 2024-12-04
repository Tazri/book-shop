"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { orderStatusColor } from "./orderStatusColor";

function OrderFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allStatusColor = orderStatusColor;
  const status = searchParams.get("status") ?? "any";

  const handleStatusChange = (e) => {
    const value = e.target.value;
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set("status", value);

    router.push(`?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };
  return (
    <div className="border p-1 s420:p-2 flex s420:flex-row flex-col s420:gap-0 gap-3 justify-between s420:items-center duration-150">
      <div>
        <h3 className="text-lg s250:text-xl s600:text-2xl text-[#333333] duration-150">
          Orders
        </h3>
        <p className="text-xs s250:text-sm s600:text-base text-[#555555] duration-150">
          (Your Total order 12)
        </p>
      </div>

      {/** divider */}
      <div className="s420:hidden w-full h-[0.5px] bg-[#dddddd]"></div>

      {/** select */}
      <div className="w-full s185:w-32 s250:w-40 px-1 cursor-pointer bg-[#eeeeee] duration-150">
        <select
          className={`text-xs s220:text-sm s250:text-base w-full bg-inherit border focus:outline-none cursor-pointer duration-150 text-${
            status === "any" ? "[#222222]" : allStatusColor[status]
          }`}
          defaultValue={status}
          onChange={handleStatusChange}
        >
          <option className="text-[#222222]" value="any">
            Any
          </option>
          <option className="text-orange-600" value="processing">
            Processing
          </option>
          <option className="text-green-600" value="approved">
            Approved
          </option>
          <option className="text-blue-600" value="onShipping">
            On Shipping
          </option>
          <option className="text-indigo-600" value="shipped">
            Shipped
          </option>
          <option className="text-emerald-600" value="completed">
            Completed
          </option>
          <option className="text-red-600" value="cancelled">
            Cancelled
          </option>
          <option className="text-rose-600" value="returned">
            Returned
          </option>
        </select>
      </div>
    </div>
  );
}

export default OrderFilter;
