import { getDiscountedPrice } from "@/libs/lib";
import Link from "next/link";
import React from "react";

function OrderTable() {
  return (
    <table className="border border-collapse w-full s450:text-base s380:text-sm text-xs duration-150 min-w-[230px]">
      <thead className="text-[#333333]">
        <tr className="bg-[#cccccc]">
          <td className="p-1 s320:p-2">Product</td>
          <td className="p-1 s320:p-2 whitespace-nowrap">Total Price</td>
        </tr>
      </thead>

      <tbody>
        <OrderRow
          title="Attack on titan vol 1"
          unitPrice={230}
          discount={12}
          quantity={14}
        />
        <OrderRow title="Erased 1" unitPrice={240} discount={4} quantity={12} />
        <OrderRow
          title="Fullmetal Alchecmist Brotherhood"
          unitPrice={260}
          discount={3}
          quantity={6}
        />
        <OrderRow
          title="Death Note"
          unitPrice={330}
          discount={5}
          quantity={3}
        />
      </tbody>

      <tfoot className="text-[#333333] font-semibold">
        <tr className="bg-[#cccccc]">
          <td className="text-right p-1 s320:p-2">Total Price</td>
          <td className="p-1 s320:p-2 text-primary">321 $</td>
        </tr>
      </tfoot>
    </table>
  );
}

function OrderRow({ title, link = "#", unitPrice, quantity, discount }) {
  const finalPrice = getDiscountedPrice(unitPrice, discount);
  const total = finalPrice * quantity;
  return (
    <tr className="text-[#333333] even:bg-[#eeeeee]">
      <td className="p-1 s320:p-2">
        <p>
          <Link href={link} className="hover:underline hover:text-primary">
            {title}
          </Link>
        </p>
        <p>
          unit price{" "}
          <span className="text-primary whitespace-nowrap">
            {finalPrice.toFixed(2)}$
          </span>
          <br />
          <span className="line-through">{unitPrice}$</span>
        </p>
        <p className="text-primary">x{quantity}</p>
      </td>

      <td className="p-1 s320:p-2 font-semibold text-primary">
        {total.toFixed(2)} $
      </td>
    </tr>
  );
}

export default OrderTable;
