import { create } from "zustand";
import {
  getDashboardStatsApi,
  getAllUsersApi,
  deleteUserApi,
} from "../services/admin.api";

const useAdminStore = create((set) => ({
  stats: null,
  users: [],
  loading: false,
  error: null,

  // Dashboard
  getDashboardStats: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getDashboardStatsApi();

      set({
        stats: data.stats,
      });

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
      });

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Users
  getAllUsers: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getAllUsersApi();

      set({
        users: data.users,
      });

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
      });

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Delete User
  deleteUser: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await deleteUserApi(id);

      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
      });

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAdminStore;
