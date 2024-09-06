"use client";
import AddressForm from "./AddressForm";
import CheckoutSummary from "./CheckoutSummary";

function CartSummary() {
  return (
    <div className="p-1 flex-grow max-w-none md:max-w-72 lg:max-w-96 flex flex-col gap-4 duration-150">
      <AddressForm />
      <CheckoutSummary />
      <button className="bg-primary text-white py-2 px-3 text-xs s185:text-sm s220:text-base duration-150">
        Proceed to Check Out
      </button>
    </div>
  );
}

export default CartSummary;
