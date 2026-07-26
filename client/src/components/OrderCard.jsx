import { Link } from "react-router-dom";


export default function OrderCard ({ order }) {
  
  if(!order) return null;

  const itemCount =
  order.items?.reduce(
    (total, item) => total + item.quantity,
    0
  ) ?? 0;

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Shipped: "bg-indigo-100 text-indigo-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return(
    <Link
      to={`/orders/${order._id}`}
      className="block rounded-xl border-2 border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-orange-300 "
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">
            Order #{order.orderNumber}
          </h3>

          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          <p className="text-sm text-gray-600">
            {itemCount} {itemCount === 1 ? "Item" : "Items"}
          </p>
        </div>

        {/* Center */}
        <div className="text-left md:text-center">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              statusColor[order.orderStatus] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        {/* Right */}
        <div className="text-left md:text-right">
          <p className="text-lg font-semibold text-orange-600">
            ₹{order.totalAmount.toLocaleString("en-IN")}
          </p>

          <p className="text-sm text-gray-500">
            {order.paymentMethod}
          </p>
        </div>
      </div>
    </Link>
  );
}