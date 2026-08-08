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

const validate = require("../middleware/validate.middleware");
const {
  addCartSchema,
  updateCartSchema,
} = require("../validators/cart.validator");

// All cart routes require authentication
router.use(protect);

router
  .route("/")
  .get(getCart)
  .post(validate(addCartSchema), addCart)
  .delete(clearCart);

router
  .route("/:id")
  .patch(validate(updateCartSchema), updateCart)
  .delete(removeCart);

module.exports = router;
