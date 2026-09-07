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

const validate = require("../middleware/validate.middleware");

const {
  createCouponValidator,
  updateCouponValidator,
} = require("../validators/coupon.validator");

const router = express.Router();

// User Coupon Validation
router.post(
  "/validate",
  protect,
  validateCoupon,
);

// Admin Coupon Routes
router.post(
  "/",
  protect,
  admin,
  validate(createCouponValidator),
  createCoupon,
);

router.get(
  "/",
  protect,
  admin,
  getAllCoupons,
);

router.get(
  "/id/:id",
  protect,
  admin,
  getCouponById,
);

router.get(
  "/code/:code",
  protect,
  admin,
  getCouponByCode,
);

router.patch(
  "/:id",
  protect,
  admin,
  validate(updateCouponValidator),
  updateCoupon,
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteCoupon,
);

module.exports = router;