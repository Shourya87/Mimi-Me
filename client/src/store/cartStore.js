import { create } from "zustand";

import {
  getCartApi,
  addCartApi,
  updateCartApi,
  removeCartApi,
  clearCartApi,
} from "../services/cart.api";

const useCartStore = create((set) => ({
  // State
  cart: [],
  loading: false,
  error: null,

  // Get Cart
  getCart: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getCartApi();

      set({
        cart: data.cart,
      });

      return data;
    } catch (error) {
      set({
        error,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Add to Cart
  addCart: async (productId, quantity = 1) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await addCartApi(productId, quantity);

      set({
        cart: data.cart,
      });

      return data;
    } catch (error) {
      set({
        error,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Update Cart Item
  updateCart: async (cartItemId, quantity) => {
    try {
      set({
        loading: true,
        error: null,
      });

      console.log(cartItemId);

      const data = await updateCartApi(cartItemId, quantity);

      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === cartItemId
            ? {
                ...item,
                quantity: data.cart.quantity,
                selectedSize: data.cart.selectedSize,
                selectedColor: data.cart.selectedColor,
              }
            : item,
        ),
      }));

      return data;
    } catch (error) {
      set({
        error,
      });

      console.log(error);
      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Remove from Cart
  removeCart: async (cartItemId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await removeCartApi(cartItemId);

      set((state) => ({
        cart: state.cart.filter((item) => item._id !== cartItemId),
      }));

      return data;
    } catch (error) {
      set({
        error,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Clear Cart
  clearCart: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await clearCartApi();

      set({
        cart: [],
      });

      return data;
    } catch (error) {
      set({
        error,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Clear Error
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useCartStore;
