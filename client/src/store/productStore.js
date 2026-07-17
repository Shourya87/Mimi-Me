import { create } from "zustand";

import {
  getProductsApi,
  getProductBySlugApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../services/product.api";

const useProductStore = create((set) => ({
  // State
  products: [],
  product: null,
  loading: false,
  error: null,

  // Get Products
  getProducts: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getProductsApi();

      set({
        products: data.products,
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

  // Get Product By Slug
  getProductBySlug: async (slug) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getProductBySlugApi(slug);

      set({
        product: data.product,
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

  // Create Product
  createProduct: async (formData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await createProductApi(formData);

      set((state) => ({
        products: [...state.products, data.product],
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

  // Update Product
  updateProduct: async (id, formData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await updateProductApi(id, formData);

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.product : product,
        ),
        product: state.product?._id === id ? data.product : state.product,
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

  // Delete Product
  deleteProduct: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await deleteProductApi(id);

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        product: state.product?._id === id ? null : state.product,
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

  // Clear Product
  clearProduct: () => {
    set({
      product: null,
    });
  },

  // Clear Error
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useProductStore;
