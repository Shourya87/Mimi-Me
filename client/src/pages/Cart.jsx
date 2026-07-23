import { useEffect } from "react";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

import useCartStore from "../store/cartStore";

export default function Cart() {
  const {
    cart,
    loading,
    error,
    getCart,
  } = useCartStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-600">
          {error.message || "Something went wrong."}
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added any products yet."
        buttonText="Start Shopping"
        buttonLink="/products"
      />
    );
  }

  return (
    <section className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-4xl font-bold text-stone-800">
          Shopping Cart
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-6 lg:col-span-2">
            {cart.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div>
            <CartSummary cartItems={cart} />
          </div>
        </div>
      </div>
    </section>
  );
}