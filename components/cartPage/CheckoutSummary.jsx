function CheckoutSummary() {
  return (
    <div className="gap-3 flex flex-col border p-3">
      <p className="text-base s280:text-lg text-[#222222] duration-150">
        Checkout Summary
      </p>

      <div className="text-[#444444]">
        <Row text="Subtotal" price={12617} />
        <Row text="Shipping" price={324} />
        <Row text="Total" price={12941} />
      </div>
    </div>
  );
}

function Row({ text, price }) {
  return (
    <div className="flex justify-between py-2 border-b first:border-t text-xs s185:text-sm s220:text-base">
      <p>{text}</p>
      <p>{price} $</p>
    </div>
  );
}

export default CheckoutSummary;
