import CheckOutSummary from "@/components/checkoutPage/CheckOutSummary";
import PaymentMethod from "@/components/checkoutPage/PaymentMethod";
import React from "react";

function CheckOutPage() {
  return (
    <div className="flex-grow container mx-auto">
      <div className="flex my-3 gap-4 md:gap-5 flex-col md:flex-row duration-150">
        <PaymentMethod />

        <CheckOutSummary />
      </div>
    </div>
  );
}

export default CheckOutPage;
