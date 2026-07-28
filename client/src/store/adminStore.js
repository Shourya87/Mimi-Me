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

  // Dashboard
  getDashboardStats: async () => {
    try {
      set({ loading: true });

      const data = await getDashboardStatsApi();

      set({
        stats: data.stats,
      });

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },


  // Users
  getAllUsers: async () => {
    try {
      set({ loading: true });

      const data = await getAllUsersApi();

      set({
        users: data.users,
      });

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Delete User
  deleteUser: async (id) => {
    try {
      set({ loading: true });

      const data = await deleteUserApi(id);

      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAdminStore;
