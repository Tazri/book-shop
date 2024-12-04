import Pagination from "@/components/shared/Pagination/Pagination";
import OrderCard from "./OrderCard";
import SingleOrder from "./OrderCard";

function OrdersList({ searchParams }) {
  const status = searchParams.status ?? "any";

  console.log(status);
  return (
    <div>
      <div className="flex flex-col gap-4">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>

      <div className="mt-4 md:mt-8">
        <Pagination searchParams={searchParams} />
      </div>
    </div>
  );
}

export default OrdersList;
