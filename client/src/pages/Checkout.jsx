import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useCartStore from "../store/cartStore";
import useOrderStore from "../store/orderStore";

import AddressForm from "../components/AddressForm";
import OrderSummary from "../components/OrderSummary";
import PriceDetails from "../components/PriceDetails";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, getCart } = useCartStore();
  const { createOrder, loading } = useOrderStore();

  const cartItems = cart?.items || cart || [];

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
      const data = await createOrder({
        shippingAddress: formData,
        paymentMethod: "COD",
      });

      navigate(`/orders/order-success/${data.order._id}`);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  if (!cartItems.length) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <section className="container mx-auto lg:px-30 md:px-20 px-15  py-5">
      <h1 className="mb-5 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-16 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="space-y-4 lg:col-span-2">
          <AddressForm formData={formData} setFormData={setFormData} />

          <OrderSummary items={cartItems} />
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
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
