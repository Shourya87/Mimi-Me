const express = require("express");
const router = express.Router();

const { getDashboardStats, getAllUsers, deleteUser } = require("../controllers/admin.controller");

const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");


// Dashboard
router.get("/dashboard", protect, admin, getDashboardStats);

// Users
router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;