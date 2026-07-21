const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const upload = require("../middleware/upload.middleware");

const { getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");



// Public
router.route("/").get(getCategories);
router.route("/:slug").get(getCategoryBySlug);


// Admin 
router.route("/").post(protect, admin, upload.single('image'),  createCategory);
router.route("/:id").patch(protect, admin, upload.single("image"), updateCategory).delete(protect, admin, deleteCategory);





module.exports = router;