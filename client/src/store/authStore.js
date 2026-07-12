import { create } from "zustand";
import {
  signUpApi,
  verifyOtpApi,
  logInApi,
  logOutApi,
  getCurrentUserApi,
} from "../services/auth.api";

const useAuthStore = create((set) => ({
  // State
  user: null,
  isAuthenticated: false,
  loading: false,

  // Signup
  signup: async (userData) => {
    try {
      set({ loading: true });

      const data = await signUpApi(userData);

      set({
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // Verify Otp
  verifyOtp: async (otpData) => {
    try {
      set({ loading: true });

      const data = await verifyOtpApi(otpData);

      set({
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // Login
  login: async (loginData) => {
    try {
      set({ loading: true });

      const data = await logInApi(loginData);

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ loading: true });

      await logOutApi();

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // Check Auth
  checkAuth: async () => {
    try {
      set({ loading: true });

      const data = await getCurrentUserApi();

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

export default useAuthStore;
