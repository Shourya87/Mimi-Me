import { Pencil, Trash2 } from "lucide-react";

const CouponTable = ({ coupons, onEdit, onDelete }) => {
  const getStatus = (coupon) => {
    const now = new Date();

    if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
      return {
        label: "Expired",
        className: "bg-[#f4e1de] text-[#a65d52]",
      };
    }

    if (
      coupon.usageLimit !== undefined &&
      coupon.usageLimit !== null &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      return {
        label: "Limit Reached",
        className: "bg-[#f1e7d6] text-[#9a7650]",
      };
    }

    return {
      label: "Active",
      className: "bg-[#e3eee7] text-[#527762]",
    };
  };

  const formatDiscount = (coupon) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}%`;
    }

    return `₹${Number(coupon.discountValue || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.05)]">
      <table className="w-full min-w-[900px]">
        <thead className="border-b border-[#eadfd5] bg-[#f5eee8]">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Code
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Discount
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Min. Order
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Usage
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Expires
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Status
            </th>

            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#eee3db]">
          {coupons?.length > 0 ? (
            coupons.map((coupon) => {
              const status = getStatus(coupon);

              return (
                <tr
                  key={coupon._id}
                  className="transition-colors hover:bg-[#fcf5f1]"
                >
                  {/* Code */}
                  <td className="px-6 py-4">
                    <span className="font-semibold tracking-wide text-[#6d5b4d]">
                      {coupon.code}
                    </span>
                  </td>

                  {/* Discount */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#b9786d]">
                      {formatDiscount(coupon)}
                    </span>
                  </td>

                  {/* Minimum Order */}
                  <td className="px-6 py-4 text-sm text-[#756457]">
                    ₹
                    {Number(coupon.minimumOrderValue || 0).toLocaleString(
                      "en-IN",
                    )}
                  </td>

                  {/* Usage */}
                  <td className="px-6 py-4 text-sm text-[#756457]">
                    {coupon.usedCount || 0}{" "}
                    <span className="text-[#a39284]">/</span>{" "}
                    {coupon.usageLimit ?? "∞"}
                  </td>

                  {/* Expiry */}
                  <td className="px-6 py-4 text-sm text-[#756457]">
                    {coupon.expiresAt
                      ? new Date(coupon.expiresAt).toLocaleDateString("en-IN")
                      : "No expiry"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(coupon)}
                        aria-label={`Edit ${coupon.code}`}
                        className="rounded-lg border border-[#dfc2b3] bg-[#f8eee9] p-2 text-[#a66f63] transition hover:bg-[#eeddd5] hover:text-[#8e5b50]"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(coupon)}
                        aria-label={`Delete ${coupon.code}`}
                        className="rounded-lg border border-[#e5c8c4] bg-[#f7e7e4] p-2 text-[#ad6258] transition hover:bg-[#eed4d0] hover:text-[#944d44]"
                      >
                        <Trash2 size={17} />
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
                className="py-12 text-center text-sm text-[#9a8879]"
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