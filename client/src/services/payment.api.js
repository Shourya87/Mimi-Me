import api from "./api";

// Create Razorpay Order
const createRazorpayOrderApi = async (orderId) => {
  const response = await api.post("/payments/create-order", {
    orderId,
  });

  return response.data;
};

// Verify Razorpay Payment
const verifyRazorpayPaymentApi = async (paymentData) => {
  const response = await api.post(
    "/payments/verify",
    paymentData,
  );

  return response.data;
};

export {
  createRazorpayOrderApi,
  verifyRazorpayPaymentApi,
};