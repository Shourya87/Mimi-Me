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
        minimumOrderValue: Number(formData.minimumOrderValue) || 0,
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
    <div className="flex min-h-screen bg-[#F8F5F1]">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar title="Create Coupon" />

        <main className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#c98f84]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Coupon Management
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
              Create Coupon
            </h1>

            <p className="mt-1.5 text-sm text-[#9a8879]">
              Create a new discount coupon for your customers.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-5 shadow-[0_8px_30px_rgba(109,91,77,0.05)] sm:p-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Coupon Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#6d5b4d]">
                  Coupon Code
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. WELCOME20"
                  className="w-full rounded-lg border border-[#dfd0c5] bg-[#fffdfb] px-4 py-3 uppercase text-[#5f5045] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#c98f84]/10"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#6d5b4d]">
                  Discount Type
                </label>

                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#dfd0c5] bg-[#fffdfb] px-4 py-3 text-[#5f5045] outline-none transition focus:border-[#c98f84] focus:ring-2 focus:ring-[#c98f84]/10"
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
                <label className="mb-2 block text-sm font-medium text-[#6d5b4d]">
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
                  className="w-full rounded-lg border border-[#dfd0c5] bg-[#fffdfb] px-4 py-3 text-[#5f5045] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#c98f84]/10"
                />
              </div>

              {/* Minimum Order */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#6d5b4d]">
                  Minimum Order Amount
                </label>

                <input
                  type="number"
                  name="minimumOrderValue"
                  value={formData.minimumOrderValue}
                  onChange={handleChange}
                  min="0"
                  placeholder="999"
                  className="w-full rounded-lg border border-[#dfd0c5] bg-[#fffdfb] px-4 py-3 text-[#5f5045] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#c98f84]/10"
                />
              </div>

              {/* Maximum Discount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#6d5b4d]">
                  Maximum Discount
                </label>

                <input
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleChange}
                  min="0"
                  placeholder="500"
                  className="w-full rounded-lg border border-[#dfd0c5] bg-[#fffdfb] px-4 py-3 text-[#5f5045] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#c98f84]/10"
                />

                <p className="mt-1.5 text-xs text-[#9a8879]">
                  Mainly useful for percentage coupons.
                </p>
              </div>

              {/* Usage Limit */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#6d5b4d]">
                  Usage Limit
                </label>

                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  min="1"
                  placeholder="100"
                  className="w-full rounded-lg border border-[#dfd0c5] bg-[#fffdfb] px-4 py-3 text-[#5f5045] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#c98f84]/10"
                />

                <p className="mt-1.5 text-xs text-[#9a8879]">
                  Leave empty for unlimited usage.
                </p>
              </div>

              {/* Expiry */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#6d5b4d]">
                  Expiry Date
                </label>

                <input
                  type="datetime-local"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#dfd0c5] bg-[#fffdfb] px-4 py-3 text-[#5f5045] outline-none transition focus:border-[#c98f84] focus:ring-2 focus:ring-[#c98f84]/10"
                />

                <p className="mt-1.5 text-xs text-[#9a8879]">
                  Leave empty if the coupon should not expire.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3 border-t border-[#eadfd5] pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/coupons")}
                disabled={loading}
                className="rounded-lg border border-[#dfd0c5] bg-[#fffdfb] px-5 py-2.5 font-medium text-[#6d5b4d] transition hover:bg-[#f5eee9] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#a8756c] px-6 py-2.5 font-medium text-white shadow-sm transition hover:bg-[#8f625a] disabled:cursor-not-allowed disabled:opacity-50"
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