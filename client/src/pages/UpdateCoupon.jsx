import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import useCouponStore from "../store/couponStore";

const UpdateCoupon = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    coupon,
    loading,
    getCouponById,
    updateCoupon,
    clearCoupon,
  } = useCouponStore();

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minimumOrderValue: "",
    maxDiscount: "",
    expiresAt: "",
    usageLimit: "",
  });

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        await getCouponById(id);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch coupon.",
        );
        navigate("/admin/coupons");
      }
    };

    fetchCoupon();

    return () => {
      clearCoupon();
    };
  }, [id, getCouponById, clearCoupon, navigate]);

  useEffect(() => {
    if (!coupon) return;

    setFormData({
      code: coupon.code || "",
      discountType: coupon.discountType || "percentage",
      discountValue: coupon.discountValue ?? "",
      minimumOrderValue: coupon.minimumOrderValue ?? "",
      maxDiscount: coupon.maxDiscount ?? "",
      expiresAt: coupon.expiresAt
        ? new Date(coupon.expiresAt).toISOString().slice(0, 16)
        : "",
      usageLimit: coupon.usageLimit ?? "",
    });
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const response = await updateCoupon(id, payload);

      toast.success(
        response?.message || "Coupon updated successfully.",
      );

      navigate("/admin/coupons");
    } catch (error) {
      console.error("Update Coupon Error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update coupon.",
      );
    }
  };

  if (loading && !coupon) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#eadfd5] border-t-[#c98f84]" />
          <p className="text-sm font-medium text-[#6d5b4d]">
            Loading Coupon...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F1]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar title="Edit Coupon" />

        <main className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#dfc2b3]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Coupon Management
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
              Update Coupon
            </h1>

            <p className="mt-1.5 text-sm text-[#9a8879]">
              Update the details of your discount coupon.
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
                  className="w-full rounded-xl border border-[#dfcfc4] bg-[#fffdfb] px-4 py-3 uppercase text-[#6d5b4d] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#eadfd5]"
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
                  className="w-full rounded-xl border border-[#dfcfc4] bg-[#fffdfb] px-4 py-3 text-[#6d5b4d] outline-none transition focus:border-[#c98f84] focus:ring-2 focus:ring-[#eadfd5]"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
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
                  placeholder="20"
                  className="w-full rounded-xl border border-[#dfcfc4] bg-[#fffdfb] px-4 py-3 text-[#6d5b4d] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#eadfd5]"
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
                  className="w-full rounded-xl border border-[#dfcfc4] bg-[#fffdfb] px-4 py-3 text-[#6d5b4d] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#eadfd5]"
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
                  className="w-full rounded-xl border border-[#dfcfc4] bg-[#fffdfb] px-4 py-3 text-[#6d5b4d] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#eadfd5]"
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
                  className="w-full rounded-xl border border-[#dfcfc4] bg-[#fffdfb] px-4 py-3 text-[#6d5b4d] outline-none transition placeholder:text-[#b5a69b] focus:border-[#c98f84] focus:ring-2 focus:ring-[#eadfd5]"
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
                  className="w-full rounded-xl border border-[#dfcfc4] bg-[#fffdfb] px-4 py-3 text-[#6d5b4d] outline-none transition focus:border-[#c98f84] focus:ring-2 focus:ring-[#eadfd5]"
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
                className="rounded-xl border border-[#dfcfc4] bg-[#fffdfb] px-5 py-2.5 font-medium text-[#756457] transition hover:bg-[#f5eee8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#b9786d] px-6 py-2.5 font-medium text-white shadow-sm transition hover:bg-[#a9685e] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Coupon"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default UpdateCoupon;