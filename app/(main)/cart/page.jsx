import CartList from "@/components/cartPage/CartList";
import CartSummary from "@/components/cartPage/CartSummary";

function CartPage() {
  return (
    <div className="flex-grow container mx-auto flex">
      <CartList />
      <CartSummary />
    </div>
  );
}

export default CartPage;
