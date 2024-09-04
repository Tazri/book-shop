import CartList from "@/components/cartPage/CartList";
import CartSummary from "@/components/cartPage/CartSummary";

function CartPage() {
  return (
    <div className="flex-grow container mx-auto flex gap-12 my-2">
      <CartList />
      <CartSummary />
    </div>
  );
}

export default CartPage;
