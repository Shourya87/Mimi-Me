import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

import Button from "./Button";
import formatCurrency from "../utils/formatCurrency";

export default function CartSummary({ cartItems = [] }) {
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      (item.product.discountPrice ?? item.product.price) * item.quantity,
    0,
  );

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-5 shadow-[0_8px_30px_rgba(109,91,77,0.06)] sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#eadfd5] pb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8ebe3] text-[#c98f84]">
          <ShoppingBag size={18} strokeWidth={1.8} />
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
            Your Order
          </p>

          <h2 className="mt-0.5 text-xl font-semibold text-[#6d5b4d]">
            Order Summary
          </h2>
        </div>
      </div>

      {/* Price Details */}
      <div className="space-y-4 py-5">
        <div className="flex items-center justify-between text-sm text-[#8d7968]">
          <span>Subtotal</span>
          <span className="font-medium text-[#6d5b4d]">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-[#8d7968]">
          <span>Shipping</span>

          {shipping === 0 ? (
            <span className="font-medium text-[#78916f]">Free</span>
          ) : (
            <span className="font-medium text-[#6d5b4d]">
              {formatCurrency(shipping)}
            </span>
          )}
        </div>

        {shipping > 0 && (
          <p className="rounded-lg bg-[#f8ebe3] px-3 py-2 text-xs leading-5 text-[#8d7968]">
            Add {formatCurrency(999 - subtotal)} more to get free shipping.
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t border-[#eadfd5] pt-5">
        <span className="text-base font-semibold text-[#6d5b4d]">
          Total
        </span>

        <span className="text-xl font-semibold text-[#6d5b4d]">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Checkout */}
      <Link to="/checkout" className="block">
        <Button className="group mt-6 flex w-full items-center justify-center gap-2 !rounded-xl !bg-[#6d5b4d] !py-3.5 transition-all hover:!bg-[#594a3f]">
          Proceed to Checkout
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Button>
      </Link>

      {/* Continue Shopping */}
      <Link
        to="/shop"
        className="mt-4 block text-center text-sm font-medium text-[#9a8879] transition hover:text-[#c98f84]"
      >
        Continue Shopping
      </Link>
    </div>
  );
}