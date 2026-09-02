import { Pencil, Trash2 } from "lucide-react";

const CouponTable = ({ coupons, onEdit, onDelete }) => {
  const getStatus = (coupon) => {
    const now = new Date();

    if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
      return {
        label: "Expired",
        className: "bg-red-100 text-red-700",
      };
    }

    if (
      coupon.usageLimit !== undefined &&
      coupon.usageLimit !== null &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      return {
        label: "Limit Reached",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "Active",
      className: "bg-green-100 text-green-700",
    };
  };

  const formatDiscount = (coupon) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}%`;
    }

    return `₹${coupon.discountValue}`;
  };

  console.log(coupons.minimumOrderValue);

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">
              Code
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Discount
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Min. Order
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Usage
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Expires
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {coupons?.length > 0 ? (
            coupons.map((coupon) => {
              const status = getStatus(coupon);

              return (
                <tr
                  key={coupon._id}
                  className="border-t hover:bg-gray-50"
                >
                  {/* Code */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">
                      {coupon.code}
                    </span>
                  </td>

                  {/* Discount */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-orange-600">
                      {formatDiscount(coupon)}
                    </span>
                  </td>

                  {/* Minimum Order */}
                  <td className="px-6 py-4">
                    ₹{(coupon.minimumOrderValue || 0).toLocaleString("en-IN")}
                  </td>

                  {/* Usage */}
                  <td className="px-6 py-4">
                    {coupon.usedCount || 0}
                    {" / "}
                    {coupon.usageLimit ?? "∞"}
                  </td>

                  {/* Expiry */}
                  <td className="px-6 py-4">
                    {coupon.expiresAt
                      ? new Date(coupon.expiresAt).toLocaleDateString(
                          "en-IN"
                        )
                      : "No expiry"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => onEdit(coupon)}
                        className="rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                        aria-label={`Edit ${coupon.code}`}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(coupon)}
                        className="rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                        aria-label={`Delete ${coupon.code}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={7}
                className="py-8 text-center text-gray-500"
              >
                No coupons found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;