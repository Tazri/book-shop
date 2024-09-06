function CheckOutSummary() {
  return (
    <div className="flex-grow p-1 basis-96 -order-1 md:-order-none">
      <h2 className="text-xs s185:text-sm s220:text-base s280:text-lg s340:text-xl s500:text-2xl pb-2 border-b text-[#333333] duration-150">
        Checkout Summary
      </h2>

      <div className=" s320:p-2 duration-150">
        <h3 className="text-sm s280:text-base s410:text-lg text-[#555555] font-semibold duration-150">
          Paymetn Details
        </h3>
        <PaymentSummary />
      </div>

      <div className="s320:p-2 mt-1 duration-150">
        <h3 className="text-sm s280:text-base s410:text-lg text-[#555555] font-semibold">
          Address Details
        </h3>

        <AddressSummary />
      </div>
    </div>
  );
}

function PaymentSummary() {
  return (
    <div className="text-xs s240:text-sm s280:text-base s410:text-lg flex flex-col">
      <Row text="Subtotal" price="280" />

      <Row text="Shipping" price="48" />
      <Row text="Total" price="328" />
      <Row text="Payable Total" price="328" />
    </div>
  );
}

function AddressSummary() {
  return (
    <div className="text-xs s240:text-sm s280:text-base s410:text-lg flex flex-col">
      <AddressRow field="City" value="Feni" />
      <AddressRow field="Area" value="Mohipal" />
      <AddressRow field="Phone" value="0123456789" />

      <div className="flex flex-col s410:px-2 py-2 duration-150 text-[#666666]">
        <span className="mb-1 s410:mb-2 duration-150">Address</span>
        <p>1234 Oakwood Avenue Suite 500 Springfield, IL 62704 United States</p>
      </div>
    </div>
  );
}

function AddressRow({ field, value }) {
  return (
    <div className="flex justify-between  s410:px-2 py-2 duration-150 border-b text-[#666666]">
      <span>{field}</span>
      <span>{value}</span>
    </div>
  );
}

function Row({ text, price }) {
  return (
    <div className="flex justify-between  s410:px-2 py-2 duration-150 border-b last:border-b-0 last:font-semibold text-[#666666]">
      <span>{text}</span>
      <span>{price} $</span>
    </div>
  );
}
export default CheckOutSummary;
