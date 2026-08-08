const { z } = require("zod");

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),

  email: z.string().trim().email("Please provide a valid email address."),

  password: z.string().min(6, "Password must be at least 6 characters long."),
});

const logInSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address."),

  password: z.string().min(1, "Password is required."),
});

const verifyOtpSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address."),

  otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number."),
});

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address."),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

module.exports = {
  signUpSchema,
  logInSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
