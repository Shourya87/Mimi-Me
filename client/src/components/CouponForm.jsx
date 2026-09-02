import { useEffect, useState } from "react";

const initialForm = {
  code: "",
  discountType: "percentage",
  discountValue: "",
  minimumOrderValue: "",
  maxDiscountAmount: "",
  expiryDate: "",
  usageLimit: "",
  isActive: true,
};

const CouponForm = ({
  initialData = null,
  loading = false,
  submitText = "Create Coupon",
  onSubmit,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code || "",
        discountType: initialData.discountType || "percentage",
        discountValue: initialData.discountValue ?? "",
        minimumOrderValue: initialData.minimumOrderValue ?? "",
        maxDiscountAmount: initialData.maxDiscountAmount ?? "",
        expiryDate: initialData.expiryDate
          ? new Date(initialData.expiryDate).toISOString().split("T")[0]
          : "",
        usageLimit: initialData.usageLimit ?? "",
        isActive: initialData.isActive ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      ...form,
      code: form.code.trim().toUpperCase(),
      discountValue: Number(form.discountValue),
      minimumOrderValue: Number(form.minimumOrderValue) || 0,
      maxDiscountAmount:
        form.maxDiscountAmount === ""
          ? undefined
          : Number(form.maxDiscountAmount),
      usageLimit:
        form.usageLimit === "" ? undefined : Number(form.usageLimit),
    };

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Coupon Code */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Coupon Code
          </label>

          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="e.g. WELCOME20"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 uppercase outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Discount Type */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Discount Type
          </label>

          <select
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (₹)</option>
          </select>
        </div>

        {/* Discount Value */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Discount Value
          </label>

          <div className="relative">
            <input
              type="number"
              name="discountValue"
              value={form.discountValue}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              placeholder="20"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
              {form.discountType === "percentage" ? "%" : "₹"}
            </span>
          </div>
        </div>

        {/* Minimum Order Amount */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Minimum Order Amount
          </label>

          <input
            type="number"
            name="minimumOrderValue"
            value={form.minimumOrderValue}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="999"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Maximum Discount */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Maximum Discount
          </label>

          <input
            type="number"
            name="maxDiscountAmount"
            value={form.maxDiscountAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="500"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          <p className="mt-1 text-xs text-gray-500">
            Useful for percentage-based coupons.
          </p>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Expiry Date
          </label>

          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Usage Limit */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Usage Limit
          </label>

          <input
            type="number"
            name="usageLimit"
            value={form.usageLimit}
            onChange={handleChange}
            min="1"
            placeholder="100"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          <p className="mt-1 text-xs text-gray-500">
            Leave empty for unlimited usage.
          </p>
        </div>

        {/* Active Status */}
        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 accent-orange-500"
            />

            <div>
              <p className="font-semibold text-gray-700">
                Active Coupon
              </p>
              <p className="text-sm text-gray-500">
                Customers can use this coupon when it is active.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default CouponForm;