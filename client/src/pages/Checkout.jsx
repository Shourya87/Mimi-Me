import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useCartStore from "../store/cartStore";
import useOrderStore from "../store/orderStore";
import usePaymentStore from "../store/paymentStore";

import AddressForm from "../components/AddressForm";
import OrderSummary from "../components/OrderSummary";
import PriceDetails from "../components/PriceDetails";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, getCart } = useCartStore();

  const { createOrder, loading: orderLoading } = useOrderStore();

  const {
    createRazorpayOrder,
    verifyRazorpayPayment,
    loading: paymentLoading,
  } = usePaymentStore();

  const cartItems = cart?.items || cart || [];

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handlePlaceOrder = async () => {
    const { fullName, phone, address, city, state, pincode, country } =
      formData;

    if (
      !fullName.trim() ||
      phone.length !== 10 ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      pincode.length !== 6 ||
      !country.trim()
    ) {
      return toast.error("Please fill all fields.", {
        id: "checkout-validation",
      });
    }

    try {
      /*
       * Create Mimi & Me order first.
       */

      const data = await createOrder({
        shippingAddress: formData,
        paymentMethod,
      });

      const order = data.order;

      /*
       * COD
       */
      if (paymentMethod === "COD") {
        navigate(`/orders/order-success/${order._id}`);
        return;
      }

      /*
       * Razorpay
       */
      const razorpayData = await createRazorpayOrder(order._id);

      const razorpayOrder = razorpayData.order;

      if (!razorpayOrder) {
        throw new Error("Unable to create Razorpay order.");
      }

      /*
       * Razorpay Checkout
       */
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "Mimi & Me",

        description: `Payment for Order ${order.orderNumber}`,

        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment verified successfully.");

            navigate(`/orders/order-success/${order._id}`);
          } catch (error) {
            console.error(error);

            toast.error(
              error?.response?.data?.message || "Payment verification failed.",
            );
          }
        },

        prefill: {
          name: formData.fullName,
        },

        theme: {
          color: "#f97316",
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to place order.",
      );
    }
  };

  const loading = orderLoading || paymentLoading;

  if (!cartItems.length) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-5 md:px-20 lg:px-30">
      <h1 className="mb-5 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-16 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="space-y-4 lg:col-span-2">
          <AddressForm formData={formData} setFormData={setFormData} />

          <OrderSummary items={cartItems} />

          {/* Payment Method */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Payment Method</h2>

            <div className="space-y-3">
              {/* COD */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                  paymentMethod === "COD"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <div>
                  <p className="font-medium">Cash on Delivery</p>

                  <p className="text-sm text-gray-500">
                    Pay when your order is delivered.
                  </p>
                </div>
              </label>

              {/* Razorpay */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                  paymentMethod === "Razorpay"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <div>
                  <p className="font-medium">Online Payment</p>

                  <p className="text-sm text-gray-500">
                    Pay securely using Razorpay.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PriceDetails items={cartItems} />

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : paymentMethod === "Razorpay"
                ? "Pay Now"
                : "Place Order"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
