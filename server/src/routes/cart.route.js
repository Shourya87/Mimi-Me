const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  getCart,
  addCart,
  updateCart,
  removeCart,
  clearCart,
} = require("../controllers/cart.controller");

// All cart routes require authentication
router.use(protect);

router.route("/").get(getCart).post(addCart).delete(clearCart);

router.route("/:id").patch(updateCart).delete(removeCart);

module.exports = router;
