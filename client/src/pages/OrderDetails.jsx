import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useOrderStore from "../store/orderStore";

import formatCurrency from "../utils/formatCurrency";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    order,
    loading,
    getOrderById,
    cancelOrder,
  } = useOrderStore();

  useEffect(() => {
    getOrderById(id);
  }, [id, getOrderById]);

  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
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
      <div className="container mx-auto px-4 py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-orange-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="mb-8 text-3xl font-bold">
        Order Details
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Info */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Order Information
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Order Number:</strong>{" "}
                {order.orderNumber}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="font-semibold text-green-600">
                  {order.orderStatus}
                </span>
              </p>

              <p>
                <strong>Placed On:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString(
                  "en-IN"
                )}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.paymentMethod}
              </p>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Shipping Address
            </h2>

            <div className="space-y-1 text-gray-700">
              <p>{order.shippingAddress?.fullName}</p>
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

          {/* Products */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-xl font-semibold">
              Ordered Items
            </h2>

            <div className="space-y-5">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 border-b pb-5 last:border-none"
                >
                  <img
                    src={
                      item.image ||
                      "https://placehold.co/120x140"
                    }
                    alt={item.title}
                    className="h-28 w-24 rounded-lg object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Size: {item.selectedSize}
                      </p>

                      <p className="text-sm text-gray-500">
                        Color: {item.selectedColor}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-xl font-semibold">
              Price Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {order.shippingFee === 0
                    ? "FREE"
                    : `${formatCurrency(order.shippingFee)}`}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {order.orderStatus === "Pending" && (
            <button
              onClick={handleCancelOrder}
              className="w-full rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;