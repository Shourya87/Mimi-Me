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
  addressIdSchema,
} = require("../validators/auth.validator");

router.get("/", protect, getAddresses);

router.post(
  "/",
  protect,
  validate(addressSchema),
  addAddress,
);

router.patch(
  "/:id",
  protect,
  validate(updateAddressSchema),
  updateAddress,
);

router.delete(
  "/:id",
  protect,
  validate(addressIdSchema),
  deleteAddress,
);

router.patch(
  "/:id/default",
  protect,
  validate(addressIdSchema),
  setDefaultAddress,
);

module.exports = router;