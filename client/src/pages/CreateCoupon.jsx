import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import useCouponStore from "../store/couponStore";

const CreateCoupon = () => {
  const navigate = useNavigate();

  const { createCoupon, loading } = useCouponStore();

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minimumOrderValue: "",
    maxDiscount: "",
    expiresAt: "",
    usageLimit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      toast.error("Coupon code is required.");
      return;
    }

    if (!formData.discountValue || Number(formData.discountValue) <= 0) {
      toast.error("Enter a valid discount value.");
      return;
    }

    if (
      formData.discountType === "percentage" &&
      Number(formData.discountValue) > 100
    ) {
      toast.error("Percentage discount cannot exceed 100%.");
      return;
    }

    try {
      const payload = {
        code: formData.code.trim().toUpperCase(),
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minOrderAmount: Number(formData.minOrderAmount) || 0,
        maxDiscount: Number(formData.maxDiscount) || undefined,
        expiresAt: formData.expiresAt || undefined,
        usageLimit: Number(formData.usageLimit) || undefined,
      };

      const response = await createCoupon(payload);

      toast.success(
        response?.message || "Coupon created successfully."
      );

      navigate("/admin/coupons");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create coupon."
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Coupon
            </h1>

            <p className="mt-1 text-gray-500">
              Create a new discount coupon for your customers.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-4xl rounded-xl bg-white p-6 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Coupon Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Coupon Code
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. WELCOME20"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 uppercase outline-none transition focus:border-orange-500"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Discount Type
                </label>

                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option value="percentage">
                    Percentage (%)
                  </option>

                  <option value="fixed">
                    Fixed Amount (₹)
                  </option>
                </select>
              </div>

              {/* Discount Value */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Discount Value
                </label>

                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  min="0"
                  placeholder={
                    formData.discountType === "percentage"
                      ? "20"
                      : "200"
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              {/* Minimum Order */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Minimum Order Amount
                </label>

                <input
                  type="number"
                  name="minOrderAmount"
                  value={formData.minimumOrderValue}
                  onChange={handleChange}
                  min="0"
                  placeholder="999"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              {/* Maximum Discount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Maximum Discount
                </label>

                <input
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleChange}
                  min="0"
                  placeholder="500"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Mainly useful for percentage coupons.
                </p>
              </div>

              {/* Usage Limit */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Usage Limit
                </label>

                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  min="1"
                  placeholder="100"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Leave empty for unlimited usage.
                </p>
              </div>

              {/* Expiry */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>

                <input
                  type="datetime-local"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Leave empty if the coupon should not expire.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3 border-t pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/coupons")}
                disabled={loading}
                className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-orange-500 px-6 py-2.5 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Coupon"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateCoupon;