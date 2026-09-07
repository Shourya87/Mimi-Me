import api from "./api";

// Get All Coupons
const getCouponsApi = async () => {
  const response = await api.get("/coupons");
  return response.data;
};

// Get Coupon By ID
const getCouponByIdApi = async (id) => {
  const response = await api.get(`/coupons/id/${id}`);
  return response.data;
};

// Get Coupon By Code
const getCouponByCodeApi = async (code) => {
  const response = await api.get(`/coupons/code/${code}`);
  return response.data;
};

// Validate Coupon
const validateCouponApi = async (couponData) => {
  const response = await api.post(
    "/coupons/validate",
    couponData,
  );

  return response.data;
};

// Create Coupon
const createCouponApi = async (couponData) => {
  const response = await api.post(
    "/coupons",
    couponData,
  );

  return response.data;
};

// Update Coupon
const updateCouponApi = async (id, couponData) => {
  const response = await api.patch(
    `/coupons/${id}`,
    couponData,
  );

  return response.data;
};

// Delete Coupon
const deleteCouponApi = async (id) => {
  const response = await api.delete(`/coupons/${id}`);
  return response.data;
};

export {
  getCouponsApi,
  getCouponByIdApi,
  getCouponByCodeApi,
  validateCouponApi,
  createCouponApi,
  updateCouponApi,
  deleteCouponApi,
};