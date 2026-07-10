const express = require("express");
const router = express.Router();
const { signUp, logIn, verifyOtp, logOut, getCurrentUser } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");




router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/verify-otp", verifyOtp);
router.post("/logout", logOut);
router.get("/user", protect, getCurrentUser);




module.exports = router;