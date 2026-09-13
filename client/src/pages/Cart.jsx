import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

import useCartStore from "../store/cartStore";

export default function Cart() {
  const { cart, loading, error, getCart } = useCartStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F8F5F1] px-6 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm text-red-600">
            {error.message || "Something went wrong."}
          </div>
        </div>
      </main>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added any products yet."
        buttonText="Start Shopping"
        buttonLink="/shop"
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5F1]">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="border-b border-[#eadfd5] bg-[#fffaf7]">
        <div className="mx-auto max-w-7xl px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfc2b3] bg-[#f8ebe3] text-[#c98f84]">
              <ShoppingBag size={18} strokeWidth={1.8} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-[#dfc2b3]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                  Your Selection
                </p>
              </div>

              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#6d5b4d] sm:text-4xl">
                Shopping Cart
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CART CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:sticky lg:top-24">
            <CartSummary cartItems={cart} />
          </div>
        </div>
      </section>
    </main>
  );
}