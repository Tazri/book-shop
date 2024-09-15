import OrderCard from "./OrderCard";
import SingleOrder from "./OrderCard";

function OrdersList({ searchParams }) {
  const status = searchParams.status ?? "any";

  console.log(status);
  return (
    <div className="flex flex-col gap-4">
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  );
}

export default OrdersList;
