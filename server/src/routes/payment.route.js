const express = require("express");

const router = express.Router();

const {
  createRazorpayOrder,
} = require("../controllers/payment.controller");

const protect = require("../middleware/auth.middleware");

router.post(
  "/create-order",
  protect,
  createRazorpayOrder
);

module.exports = router;