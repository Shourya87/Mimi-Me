import { create } from "zustand";

import {
  signUpApi,
  verifyOtpApi,
  logInApi,
  logOutApi,
  getCurrentUserApi,
  updateProfileApi,
  changePasswordApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../services/auth.api";

const useAuthStore = create((set) => ({
  // State
  user: null,
  isAuthenticated: false,
  loading: false,
  authInitialized: false,

  // Signup
  signUp: async (userData) => {
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

  // Verify OTP
  verifyOtp: async (otpData) => {
    try {
      set({ loading: true });

      const data = await verifyOtpApi(otpData);

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
        authInitialized: true,
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
  logIn: async (loginData) => {
    try {
      set({ loading: true });

      const data = await logInApi(loginData);

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
        authInitialized: true,
      });

      return data;
    } catch (error) {
      set({
        loading: false,
        authInitialized: true,
      });

      throw error;
    }
  },

  // Logout
  logOut: async () => {
    try {
      set({ loading: true });

      await logOutApi();

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        authInitialized: true,
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
      set({
        loading: true,
      });

      const data = await getCurrentUserApi();

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
        authInitialized: true,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        authInitialized: true,
      });
    }
  },

  // Update Profile
  updateProfile: async (profileData) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await updateProfileApi(profileData);

      set({
        user: data.user,
      });

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Change Password
  changePassword: async (passwordData) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await changePasswordApi(passwordData);

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    try {
      set({ loading: true });

      const data = await forgotPasswordApi(email);

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

  // Reset Password
  resetPassword: async (token, password) => {
    try {
      set({ loading: true });

      const data = await resetPasswordApi(token, password);

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
}));

export default useAuthStore;