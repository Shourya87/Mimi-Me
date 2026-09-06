const express = require("express");

const router = express.Router();

const {
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controllers/payment.controller");

const protect = require("../middleware/auth.middleware");

router.post(
  "/create-order",
  protect,
  createRazorpayOrder,
);

router.post(
  "/verify",
  protect,
  verifyRazorpayPayment,
);

module.exports = router;