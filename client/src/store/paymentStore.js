import { create } from "zustand";

import {
  createRazorpayOrderApi,
  verifyRazorpayPaymentApi,
} from "../services/payment.api";

const usePaymentStore = create((set) => ({
  razorpayOrder: null,
  loading: false,
  error: null,

  // Create Razorpay Order
  createRazorpayOrder: async (orderId) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await createRazorpayOrderApi(orderId);

      set({
        razorpayOrder: data.order,
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });

      throw error;
    }
  },

  // Verify Razorpay Payment
  verifyRazorpayPayment: async (paymentData) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await verifyRazorpayPaymentApi(paymentData);

      set({
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });

      throw error;
    }
  },

  // Helpers
  clearPayment: () =>
    set({
      razorpayOrder: null,
      error: null,
    }),

  clearError: () =>
    set({
      error: null,
    }),
}));

export default usePaymentStore;