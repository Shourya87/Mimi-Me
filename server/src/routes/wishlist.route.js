const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const  { addToWishlist, getWishlist, removeFromWishlist, clearWishlist } = require("../controllers/wishlist.controller");


// All wishlist routes require authentication
router.use(protect);

// Get and Add Item
router.route("/").get(getWishlist).post(addToWishlist);

// Remove Item
router.route("/:wishlistItemId").delete(removeFromWishlist);

// Clear wishlist
router.delete("/", clearWishlist);

module.exports = router;