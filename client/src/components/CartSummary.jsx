import { Link } from "react-router-dom";

import Button from "./Button";

export default function CartSummary({ cartItems }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-stone-800">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-stone-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex items-center justify-between text-stone-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="font-medium text-green-600">Free</span>
            ) : (
              `₹${shipping.toLocaleString("en-IN")}`
            )}
          </span>
        </div>

        <hr className="border-stone-200" />

        <div className="flex items-center justify-between text-xl font-bold text-stone-900">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <Button className="mt-6 w-full" >
        Proceed to Checkout
      </Button>

      <Link
        to="/products"
        className="mt-4 block text-center text-sm font-medium text-amber-700 transition hover:text-amber-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}