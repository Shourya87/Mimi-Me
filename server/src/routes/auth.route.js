const express = require("express");
const router = express.Router();
const {
  signUp,
  logIn,
  verifyOtp,
  logOut,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  signUpSchema,
  logInSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validators/auth.validator");

router.post("/signup", validate(signUpSchema), signUp);
router.post("/login", validate(logInSchema), logIn);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);
router.post("/logout", protect, logOut);
router.get("/user", protect, getCurrentUser);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);

module.exports = router;
