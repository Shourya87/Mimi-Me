import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useOrderStore from "../store/orderStore";
import formatCurrency from "../utils/formatCurrency";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { order, loading, getOrderById, cancelOrder } = useOrderStore();

  useEffect(() => {
    getOrderById(id);
  }, [id, getOrderById]);

  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      await cancelOrder(id);
      getOrderById(id);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || !order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-[#eadfd5] border-t-[#c98f84]" />
          <p className="text-sm font-medium text-[#8b7465]">
            Loading Order...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F5F1] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-sm font-medium text-[#a4776f] transition hover:text-[#8f625b]"
        >
          ← Back to Orders
        </button>

        {/* Page Header */}
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-6 bg-[#dfc2b3]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
              Order Management
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
            Order Details
          </h1>

          <p className="mt-1.5 text-sm text-[#9a8879]">
            View your order information, items, and payment details.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Order Information */}
            <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-5 shadow-[0_8px_30px_rgba(109,91,77,0.04)] sm:p-6">
              <h2 className="mb-5 text-lg font-semibold text-[#6d5b4d]">
                Order Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#a18d7d]">
                    Order Number
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#6d5b4d]">
                    {order.orderNumber}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-[#a18d7d]">
                    Status
                  </p>
                  <span className="mt-1 inline-flex rounded-full bg-[#f3e4df] px-3 py-1 text-xs font-semibold text-[#9a655c]">
                    {order.orderStatus}
                  </span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-[#a18d7d]">
                    Placed On
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#6d5b4d]">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-[#a18d7d]">
                    Payment
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#6d5b4d]">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-5 shadow-[0_8px_30px_rgba(109,91,77,0.04)] sm:p-6">
              <h2 className="mb-5 text-lg font-semibold text-[#6d5b4d]">
                Shipping Address
              </h2>

              <div className="space-y-1.5 text-sm leading-6 text-[#806e60]">
                <p className="font-semibold text-[#6d5b4d]">
                  {order.shippingAddress?.fullName}
                </p>
                <p>{order.shippingAddress?.phone}</p>
                <p>{order.shippingAddress?.address}</p>
                <p>
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state}
                </p>
                <p>{order.shippingAddress?.pincode}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-5 shadow-[0_8px_30px_rgba(109,91,77,0.04)] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#6d5b4d]">
                  Ordered Items
                </h2>

                <span className="rounded-full bg-[#f5ebe6] px-3 py-1 text-xs font-medium text-[#92776a]">
                  {order.items?.length || 0}{" "}
                  {order.items?.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              <div className="space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 border-b border-[#eadfd5] pb-5 last:border-none last:pb-0"
                  >
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/120x140"
                      }
                      alt={item.title}
                      className="h-24 w-20 shrink-0 rounded-xl object-cover sm:h-28 sm:w-24"
                    />

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-[#6d5b4d] sm:text-base">
                          {item.title}
                        </h3>

                        <div className="mt-1.5 space-y-0.5 text-xs text-[#9a8879]">
                          <p>Size: {item.selectedSize}</p>
                          <p>Color: {item.selectedColor}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-[#a4776f]">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="sticky top-24 rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-5 shadow-[0_8px_30px_rgba(109,91,77,0.05)] sm:p-6">
              <h2 className="mb-5 text-lg font-semibold text-[#6d5b4d]">
                Price Summary
              </h2>

              <div className="space-y-3 text-sm text-[#806e60]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#6d5b4d]">
                    {formatCurrency(order.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {order.shippingFee === 0 ? (
                      <span className="text-[#6c9a78]">FREE</span>
                    ) : (
                      formatCurrency(order.shippingFee)
                    )}
                  </span>
                </div>

                <hr className="border-[#eadfd5]" />

                <div className="flex justify-between text-base font-semibold text-[#6d5b4d]">
                  <span>Total</span>
                  <span className="text-[#a4776f]">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Cancel Order */}
            {order.orderStatus === "Pending" && (
              <button
                onClick={handleCancelOrder}
                className="w-full rounded-xl border border-[#e5c9c3] bg-[#fffaf7] py-3 text-sm font-semibold text-[#b56f67] transition hover:border-[#d9afa8] hover:bg-[#fdf1ee]"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;