const express = require("express");
const router = express.Router();
const { signUp, logIn, verifyOtp, logOut, getCurrentUser, forgotPassword, resetPassword } = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");




router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/verify-otp", verifyOtp);
router.post("/logout", logOut);
router.get("/user", protect, getCurrentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);




module.exports = router;