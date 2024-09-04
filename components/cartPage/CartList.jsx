"use client";
import CartBookCard from "./CartBookCard";

function CartList() {
  return (
    <div className="flex-grow border p-1">
      <div className="flex flex-col gap-3">
        <CartBookCard />
        <CartBookCard />
        <CartBookCard />
        <CartBookCard />
      </div>
    </div>
  );
}

export default CartList;
