import { create } from "zustand";

import {
  getCategoriesApi,
  getCategoryBySlugApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../services/category.api";

const useCategoryStore = create((set) => ({
  // State
  categories: [],
  category: null,
  loading: false,
  error: null,

  // Get categories
  getCategories: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getCategoriesApi();

      set({
        categories: data.categories,
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

  // Get category By Slug
  getCategoryBySlug: async (slug) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getCategoryBySlugApi(slug);

      set({
        categories: data.category,
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

  // Create Category
  createCategory: async (formData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await createCategoryApi(formData);

      set((state) => ({
        categories: [...state.categories, data.category],
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

  // Update Category
  updateCategory: async (id, formData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await updateCategoryApi(id, formData);

      set((state) => ({
        categories: state.categories.map((category) =>
          category._id === id ? data.category : category,
        ),
        category: state.category?._id === id ? data.category : state.category,
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

  // Delete Category
  deleteCategory: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await deleteCategoryApi(id);

      set((state) => ({
        categories: state.categories.filter((category) => category._id !== id),
        category: state.category?._id === id ? null : state.category,
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

  // Clear Category
  clearCategory: () => {
    set({
      category: null,
    });
  },

  // Clear Error
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useCategoryStore;
