import { create } from "zustand";

import {
  getCouponsApi,
  getCouponByIdApi,
  getCouponByCodeApi,
  validateCouponApi,
  createCouponApi,
  updateCouponApi,
  deleteCouponApi,
} from "../services/coupon.api";

const useCouponStore = create((set) => ({
  // State
  coupons: [],
  coupon: null,
  validatedCoupon: null,
  loading: false,
  error: null,

  // Get All Coupons
  getCoupons: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getCouponsApi();

      set({
        coupons: data.coupons,
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

  // Get Coupon By ID
  getCouponById: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getCouponByIdApi(id);

      set({
        coupon: data.coupon,
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

  // Get Coupon By Code
  getCouponByCode: async (code) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getCouponByCodeApi(code);

      set({
        coupon: data.coupon,
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

  // Validate Coupon
  validateCoupon: async (couponData) => {
    try {
      set({
        loading: true,
        error: null,
        validatedCoupon: null,
      });

      const data = await validateCouponApi(couponData);

      set({
        validatedCoupon: data.coupon,
      });

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        validatedCoupon: null,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Create Coupon
  createCoupon: async (couponData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await createCouponApi(couponData);

      set((state) => ({
        coupons: [data.coupon, ...state.coupons],
      }));

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

  // Update Coupon
  updateCoupon: async (id, couponData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await updateCouponApi(id, couponData);

      set((state) => ({
        coupons: state.coupons.map((coupon) =>
          coupon._id === id ? data.coupon : coupon
        ),

        coupon:
          state.coupon?._id === id
            ? data.coupon
            : state.coupon,
      }));

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

  // Delete Coupon
  deleteCoupon: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await deleteCouponApi(id);

      set((state) => ({
        coupons: state.coupons.filter(
          (coupon) => coupon._id !== id
        ),

        coupon:
          state.coupon?._id === id
            ? null
            : state.coupon,
      }));

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

  // Clear Coupon
  clearCoupon: () => {
    set({
      coupon: null,
    });
  },

  // Clear Validated Coupon
  clearValidatedCoupon: () => {
    set({
      validatedCoupon: null,
    });
  },

  // Clear Error
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useCouponStore;