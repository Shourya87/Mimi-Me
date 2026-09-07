import { useState } from "react";

import toast from "react-hot-toast";

import formatCurrency from "../utils/formatCurrency";
import useCouponStore from "../store/couponStore";

export default function PriceDetails({
  items = [],
  onCouponApplied,
  onCouponRemoved,
}) {
  const { validateCoupon, clearValidatedCoupon } = useCouponStore();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);

  // ----------------------------------------
  // Price Calculation
  // ----------------------------------------

  const totalMRP = items.reduce((total, item) => {
    const price = item.product ? item.product.price : item.price;

    return total + price * item.quantity;
  }, 0);

  const totalProductDiscount = items.reduce((total, item) => {
    const price = item.product ? item.product.price : item.price;

    const discountPrice = item.product
      ? item.product.discountPrice || item.product.price
      : item.discountPrice || item.price;

    return total + (price - discountPrice) * item.quantity;
  }, 0);

  const subtotal = totalMRP - totalProductDiscount;

  const shipping = subtotal >= 999 ? 0 : 99;

  // Coupon discount is applied after product discount.
  const totalDiscount = totalProductDiscount + couponDiscount;

  const totalAmount = Math.max(
    subtotal - couponDiscount + shipping,
    0,
  );

  // ----------------------------------------
  // Apply Coupon
  // ----------------------------------------

  const handleApplyCoupon = async () => {
    const code = couponCode.trim();

    if (!code) {
      return toast.error("Please enter a coupon code.", {
        id: "coupon-validation",
      });
    }

    if (subtotal <= 0) {
      return toast.error("Coupon cannot be applied to an empty order.", {
        id: "coupon-validation",
      });
    }

    try {
      setCouponLoading(true);

      const data = await validateCoupon({
        code,
        orderAmount: subtotal,
      });

      const discountAmount = Number(data.discountAmount || 0);

      const coupon = {
        ...data.coupon,
        discountAmount,
      };

      setAppliedCoupon(coupon);
      setCouponDiscount(discountAmount);

      if (onCouponApplied) {
        onCouponApplied({
          coupon,
          discountAmount,
          orderAmount: subtotal,
          finalAmount: Number(
            Math.max(subtotal - discountAmount, 0).toFixed(2),
          ),
        });
      }

      toast.success("Coupon applied successfully.");
    } catch (error) {
      console.error(error);

      setAppliedCoupon(null);
      setCouponDiscount(0);

      if (onCouponRemoved) {
        onCouponRemoved();
      }

      toast.error(
        error?.response?.data?.message ||
          "Unable to apply coupon.",
      );
    } finally {
      setCouponLoading(false);
    }
  };

  // ----------------------------------------
  // Remove Coupon
  // ----------------------------------------

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponDiscount(0);

    clearValidatedCoupon();

    if (onCouponRemoved) {
      onCouponRemoved();
    }

    toast.success("Coupon removed.");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 border-b pb-3 text-lg font-semibold text-gray-800">
        Price Details
      </h2>

      {/* ----------------------------------------
          Coupon
      ---------------------------------------- */}

      <div className="mb-5">
        <p className="mb-2 text-sm font-medium text-gray-700">
          Apply Coupon
        </p>

        {appliedCoupon ? (
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
            <div>
              <p className="font-semibold text-green-700">
                {appliedCoupon.code}
              </p>

              <p className="text-xs text-green-600">
                You saved {formatCurrency(couponDiscount)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-sm font-medium text-red-500 transition hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyCoupon();
                }
              }}
              placeholder="Enter coupon code"
              maxLength={30}
              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />

            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={couponLoading}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {couponLoading ? "Applying..." : "Apply"}
            </button>
          </div>
        )}
      </div>

      {/* ----------------------------------------
          Price Breakdown
      ---------------------------------------- */}

      <div className="space-y-3 text-sm">
        {/* Product Price */}

        <div className="flex justify-between">
          <span className="text-gray-600">
            Price ({items.length}{" "}
            {items.length === 1 ? "item" : "items"})
          </span>

          <span>{formatCurrency(totalMRP)}</span>
        </div>

        {/* Product Discount */}

        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>

          <span className="text-green-600">
            - {formatCurrency(totalProductDiscount)}
          </span>
        </div>

        {/* Coupon Discount */}

        {couponDiscount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Coupon Discount</span>

            <span className="text-green-600">
              - {formatCurrency(couponDiscount)}
            </span>
          </div>
        )}

        {/* Shipping */}

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>

          {shipping === 0 ? (
            <span className="font-medium text-green-600">
              FREE
            </span>
          ) : (
            <span>{formatCurrency(shipping)}</span>
          )}
        </div>

        {/* Divider */}

        <div className="my-3 border-t border-gray-400" />

        {/* Total */}

        <div className="flex justify-between text-base font-semibold">
          <span>Total Amount</span>

          <span>{formatCurrency(totalAmount)}</span>
        </div>

        {/* Total Savings */}

        {totalDiscount > 0 && (
          <p className="pt-2 text-sm font-medium text-green-500">
            You saved {formatCurrency(totalDiscount)} on this order.
          </p>
        )}
      </div>
    </div>
  );
}