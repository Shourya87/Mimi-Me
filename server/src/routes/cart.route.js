const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const { getCart, addToCart, updateCartItem, removeCartItem, clearCart } = require("../controllers/cart.controller");




// All cart routes require authentication
router.use(protect);

// Get and Add Item
router.route("/").get(getCart).post(addToCart);

// Update and Delete Item
router.route("/:cartItemId").patch(updateCartItem).delete(removeCartItem);

// Clear entire cart
router.delete("/", clearCart);



module.exports = router;