import { useEffect } from "react";
import { Link } from "react-router-dom";

import useOrderStore from "../store/orderStore";
import OrderCard from "../components/OrderCard";

export default function Order() {
  const { orders = [], loading, getMyOrders } = useOrderStore();

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F8F5F1] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7">
            <div className="h-7 w-32 animate-pulse rounded-lg bg-[#eadfd5]" />
            <div className="mt-2 h-4 w-52 animate-pulse rounded bg-[#eadfd5]" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl border border-[#eadfd5] bg-[#fffaf7]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F5F1] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#dfc2b3]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Your Shopping
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
              My Orders
            </h1>

            <p className="mt-1.5 text-sm text-[#9a8879]">
              Track and view your recent orders.
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-[#eadfd5] bg-[#fffaf7] px-3 py-1.5 text-xs font-medium text-[#8b7465] shadow-sm">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#dfcfc3] bg-[#fffaf7] px-5 py-16 text-center shadow-[0_8px_30px_rgba(109,91,77,0.04)]">
            <h2 className="text-xl font-semibold text-[#6d5b4d] sm:text-2xl">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-[#9a8879]">
              Looks like you haven't placed any orders yet.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#c98f84] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#b97c72] hover:shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Orders */
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}