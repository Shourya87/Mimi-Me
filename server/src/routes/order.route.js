const express = require("express");
const router = express.Router();

const { createOrder, getMyOrders, cancelOrder, getAllOrders, getOrderById, updateOrderStatus  } = require("../controllers/order.controller.js");

const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");



// User
router.route("/")
  .post(protect, createOrder)
  .get(protect, getMyOrders);

// Admin (move above :id)
router.route("/admin")
  .get(protect, admin, getAllOrders);

router.route("/admin/:id")
  .patch(protect, admin, updateOrderStatus);

// User
router.route("/:id")
  .get(protect, getOrderById);

router.route("/:id/cancel")
  .patch(protect, cancelOrder);
  

module.exports = router;