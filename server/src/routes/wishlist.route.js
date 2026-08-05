const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlist.controller");

// All wishlist routes require authentication
router.use(protect);

router.route("/").get(getWishlist).post(addToWishlist).delete(clearWishlist);

router.route("/:id").delete(removeFromWishlist);

module.exports = router;
