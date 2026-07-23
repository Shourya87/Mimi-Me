const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const { getCart, addCart, updateCart, removeCart, clearCart } = require("../controllers/cart.controller");




// All cart routes require authentication
router.use(protect);

// Get and Add Item
router.route("/").get(getCart).post(addCart);

// Update and Delete Item
router.route("/:cartItemId").patch(updateCart).delete(removeCart);

// Clear entire cart
router.delete("/", clearCart);



module.exports = router;