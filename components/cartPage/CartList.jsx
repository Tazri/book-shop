"use client";
import CartBookCard from "./CartBookCard";

function CartList(props) {
  return (
    <div className="flex-grow p-1">
      <div className="flex flex-col gap-3">
        <CartBookCard bookId="aot" {...props} />
        <CartBookCard bookId="erased" {...props} />
        <CartBookCard bookId="fma" {...props} />
        <CartBookCard bookId="fmab" {...props} />
      </div>
    </div>
  );
}

export default CartList;
