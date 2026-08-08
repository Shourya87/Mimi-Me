const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const upload = require("../middleware/upload.middleware");

const {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const validate = require("../middleware/validate.middleware");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/product.validator");

// User
router.route("/").get(getProducts);
router.route("/:slug").get(getProductBySlug);

// Admin
router
  .route("/")
  .post(
    protect,
    admin,
    upload.array("images", 5),
    validate(createProductSchema),
    createProduct,
  );
router
  .route("/:id")
  .patch(
    protect,
    admin,
    upload.array("images", 5),
    validate(updateProductSchema),
    updateProduct,
  )
  .delete(protect, admin, deleteProduct);

module.exports = router;
