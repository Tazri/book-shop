"use client";
import CartBookCard from "./CartBookCard";

function CartList() {
  return (
    <div className="flex-grow p-1">
      <div className="flex flex-col gap-3">
        <CartBookCard bookId="aot" />
        <CartBookCard bookId="erased" />
        <CartBookCard bookId="fma" />
        <CartBookCard bookId="fmab" />
      </div>
    </div>
  );
}

export default CartList;
