import { Eye, SquarePen } from "lucide-react";

const OrderTable = ({
  orders,
  onView,
  onUpdateStatus,
}) => {

  const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 px-3 py-0.5 font-semibold rounded-full text-green-700";
    case "Cancelled":
      return "bg-red-100 px-3 py-0.5 font-semibold rounded-full text-red-700";
    case "Confirmed":
      return "bg-blue-100 px-3 py-0.5 font-semibold rounded-full text-blue-700";
    case "Packed":
      return "bg-indigo-100 px-3 py-0.5 font-semibold rounded-full px-4 text-indigo-700";
    case "Shipped":
      return "bg-purple-100 px-3 py-0.5 font-semibold rounded-full text-purple-700";
    default:
      return "bg-yellow-100 px-3 py-0.5 font-semibold rounded-full text-yellow-700";
  }
};


  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-4">Order No.</th>
            <th className="text-left px-6 py-4">Customer</th>
            <th className="text-left px-6 py-4">Amount</th>
            <th className="text-left px-6 py-4">Payment</th>
            <th className="text-left px-6 py-4">Status</th>
            <th className="text-center px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50"
              >
                {/* Order Number */}
                <td className="px-6 py-4 font-medium">
                  {order.orderNumber}
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  {order.user?.name || "Unknown User"}
                </td>

                {/* Total */}
                <td className="px-6 py-4">
                  ₹{order.totalAmount}
                </td>

                {/* Payment */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                {/* Order Status */}
                <td className="px-6 py-4">
                  <span
                    className={getStatusColor(order.orderStatus)}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onView(order)}
                      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onUpdateStatus(order)}
                      className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                    >
                      <SquarePen size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-8 text-gray-500"
              >
                No Orders Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;