const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const upload = require("../middleware/upload.middleware");

const validate = require("../middleware/validate.middleware");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validators/category.validator");

const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

// User
router.route("/").get(getCategories);
router.route("/:slug").get(getCategoryBySlug);

// Admin
router
  .route("/")
  .post(
    protect,
    admin,
    upload.single("image"),
    validate(createCategorySchema),
    createCategory,
  );
router
  .route("/:id")
  .patch(
    protect,
    admin,
    upload.single("image"),
    validate(updateCategorySchema),
    updateCategory,
  )
  .delete(protect, admin, deleteCategory);

module.exports = router;
