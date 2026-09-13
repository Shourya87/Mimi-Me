import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";

export default function OrderCard({ order }) {
  if (!order) return null;

  const itemCount =
    order.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  const statusStyles = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    Shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  const formattedAmount = Number(order.totalAmount || 0).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  );

  return (
    <Link
      to={`/orders/${order._id}`}
      className="group block rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Order Info */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <Package size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-stone-800">
              Order #{order.orderNumber}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500">
              <span>{formattedDate}</span>
              <span className="hidden h-1 w-1 rounded-full bg-stone-300 sm:block" />
              <span>
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="sm:shrink-0">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
              statusStyles[order.orderStatus] ||
              "border-stone-200 bg-stone-50 text-stone-600"
            }`}
          >
            {order.orderStatus || "Unknown"}
          </span>
        </div>

        {/* Amount & Payment */}
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="sm:text-right">
            <p className="text-lg font-semibold text-stone-900">
              ₹{formattedAmount}
            </p>
            <p className="mt-0.5 text-xs text-stone-500">
              {order.paymentMethod || "Payment"}
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition group-hover:bg-orange-50 group-hover:text-orange-600">
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}