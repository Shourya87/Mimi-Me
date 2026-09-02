const express = require("express");

const {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
  getCouponById,
} = require("../controllers/coupon.controller");

const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const router = express.Router();

// User Coupon Validation
router.post("/validate", protect, validateCoupon);

// Admin Coupon Routes
router.post("/", protect, admin, createCoupon);
router.get("/", protect, admin, getAllCoupons);
router.get("/id/:id", protect, admin, getCouponById);
router.get("/code/:code", protect, admin, getCouponByCode);
router.patch("/:id", protect, admin, updateCoupon);
router.delete("/:id", protect, admin, deleteCoupon);

module.exports = router;