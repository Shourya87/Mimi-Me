import axios from "axios";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import OrderSuccess from "./pages/OrderSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";
import ManageUsers from "./pages/ManageUsers";

export default function App() {
  // Backend Testing Code -
  // useEffect(() => {

  //   axios
  //   .get("http://localhost:3000/api/test")
  //   .then((res) => console.log(res.data))
  //   .catch(console.error);

  // },[])

  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  const product = {
    _id: "6a593994fa9e2e24ddcc8065",
    title: "Premium Party Gown",
    slug: "premium-party-gown",
    description:
      "Premium elegant gown made with soft layered tulle for birthdays and special occasions.",
    price: 2099,
    discountPrice: 1799,
    brand: "Mimi & Me",
    category: "Girls",
    sizes: ["18+ year"],
    colors: ["Multicolor", "Purple"],
    stock: 18,
    images: {
      url: "https://res.cloudinary.com/dv3cubae4/image/upload/v1784233965/Mimi%20Me/Products/rnlaocwiud11cvkqaf8a.png",
      public_id: "Mimi Me/Products/rnlaocwiud11cvkqaf8a",
    },
  };

  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:slug" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/orders/order-success/:id" element={<OrderSuccess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
