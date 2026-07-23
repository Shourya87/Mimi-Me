import { create } from "zustand";

import {
  getWishlistApi,
  addWishlistApi,
  removeWishlistApi,
  clearWishlistApi,
} from "../services/wishlist.api";

const useWishlistStore = create((set, get) => ({
  // State
  wishlist: [],
  loading: false,
  error: null,

  // Get Wishlist
  getWishlist: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getWishlistApi();

      set({
        wishlist: data.wishlist,
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

  // Add to Wishlist
  addWishlist: async (product) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await addWishlistApi(product);

      set({
        wishlist: data.wishlist,
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

  // Remove from Wishlist
  removeWishlist: async (product) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await removeWishlistApi(product);

      set({
        wishlist: data.wishlist,
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

  // Clear Wishlist
  clearWishlist: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await clearWishlistApi();

      set({
        wishlist: [],
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

  // Check if Product Exists in Wishlist
  isInWishlist: (product) => {
    return get().wishlist.some(
      (item) => item.product._id === product
    );
  },

  // Clear Error
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useWishlistStore;