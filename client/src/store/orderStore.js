import { create } from "zustand";
import {
  createOrderApi,
  getMyOrdersApi,
  getOrderByIdApi,
  cancelOrderApi,
  getAllOrdersApi,
  updateOrderStatusApi,
} from "../services/order.api";

const useOrderStore = create((set) => ({
  // State
  orders: [],
  order: null,
  loading: false,
  error: null,

  // Create Order
  createOrder: async (orderData) => {
    set({ loading: true, error: null });

    try {
      const data = await createOrderApi(orderData);

      set((state) => ({
        order: data.order,
        orders: [data.order, ...state.orders],
        loading: false,
      }));

      return data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });

      throw error;
    }
  },

  // Get My Orders
  getMyOrders: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getMyOrdersApi();

      set({
        orders: data.orders,
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

  // Get Single Order
  getOrderById: async (id) => {
    set({ loading: true, error: null });

    try {
      const data = await getOrderByIdApi(id);

      set({
        order: data.order,
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

  // Cancel Order
  cancelOrder: async (id) => {
    set({ loading: true, error: null });

    try {
      const data = await cancelOrderApi(id);

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === id ? data.order : order,
        ),
        order: state.order?._id === id ? data.order : state.order,
        loading: false,
      }));

      return data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });

      throw error;
    }
  },

  // Get All Orders (Admin)
  getAllOrders: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getAllOrdersApi();

      set({
        orders: data.orders,
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

  // Update Order Status (Admin)
  updateOrderStatus: async (id, orderData) => {
    set({ loading: true, error: null });

    try {
      const data = await updateOrderStatusApi(id, orderData);

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === id ? data.order : order,
        ),
        order: state.order?._id === id ? data.order : state.order,
        loading: false,
      }));

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
  clearOrder: () => set({ order: null }),

  clearOrders: () => set({ orders: [], order: null }),

  clearError: () => set({ error: null }),
}));

export default useOrderStore;
