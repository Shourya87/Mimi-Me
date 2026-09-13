import { Eye, SquarePen } from "lucide-react";

import formatCurrency from "../utils/formatCurrency";
import { ORDER_STATUS_STYLES } from "../constants/order";

const OrderTable = ({ orders = [], onView, onUpdateStatus }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_6px_24px_rgba(109,91,77,0.05)]">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-[#eadfd5] bg-[#f8f5f1]">
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a8879]">
              Order No.
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a8879]">
              Customer
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a8879]">
              Amount
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a8879]">
              Payment
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#9a8879]">
              Status
            </th>

            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#9a8879]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => {
              const statusStyle =
                ORDER_STATUS_STYLES[order.orderStatus] ||
                "bg-[#f8f5f1] text-[#7d6a59]";

              return (
                <tr
                  key={order._id}
                  className="border-b border-[#eadfd5] transition-colors last:border-0 hover:bg-[#fdf8f4]"
                >
                  {/* Order Number */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#6d5b4d]">
                      {order.orderNumber}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#6d5b4d]">
                        {order.user?.name || "Unknown User"}
                      </p>

                      {order.user?.email && (
                        <p className="mt-0.5 text-xs text-[#9a8879]">
                          {order.user.email}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#6d5b4d]">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onView(order)}
                        aria-label="View order"
                        title="View order"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfc2b3] bg-[#fffaf7] text-[#7d6a59] transition-all duration-200 hover:border-[#c98f84] hover:bg-[#f8ebe3] hover:text-[#c98f84]"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onUpdateStatus(order)}
                        aria-label="Update order status"
                        title="Update status"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c98f84] text-white transition-all duration-200 hover:bg-[#b97d73] hover:shadow-sm"
                      >
                        <SquarePen size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-14 text-center"
              >
                <p className="text-sm font-medium text-[#6d5b4d]">
                  No Orders Found
                </p>

                <p className="mt-1 text-xs text-[#9a8879]">
                  Customer orders will appear here once they are placed.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;