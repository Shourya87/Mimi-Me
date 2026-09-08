const express = require("express");

const router = express.Router();

const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/address.controller");

const protect = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
  addressSchema,
  updateAddressSchema,
} = require("../validators/auth.validator");

// Get All Addresses
router.get("/", protect, getAddresses);

// Add Address
router.post(
  "/",
  protect,
  validate(addressSchema),
  addAddress,
);

// Update Address
router.patch(
  "/:id",
  protect,
  validate(updateAddressSchema),
  updateAddress,
);

// Delete Address
router.delete("/:id", protect, deleteAddress);

// Set Default Address
router.patch(
  "/:id/default",
  protect,
  setDefaultAddress,
);

module.exports = router;