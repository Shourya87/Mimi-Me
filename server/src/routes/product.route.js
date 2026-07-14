const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const { createProduct, getProducts, getProductBySlug, updateProduct, deleteProduct } = require("../controllers/product.controller");






// Public
router.route("/").get(getProducts);
router.route("/:slug").get(getProductBySlug);


// Admin 
router.route("/").post(protect, admin,/*upload.array('images', 5), */ createProduct);
router.route("/:id").patch(protect, admin, updateProduct).delete(protect, admin, deleteProduct);







module.exports = router;