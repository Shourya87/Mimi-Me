import { useEffect } from "react";
import { Link } from "react-router-dom";

import useOrderStore from "../store/orderStore";
import OrderCard from "../components/OrderCard";

export default function Order() {
  const { orders, loading, getMyOrders } = useOrderStore();

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-10 md:px-14 lg:px-20 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-600">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            No Orders Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Looks like you haven't placed any orders.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition hover:bg-orange-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}
