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

// Address
const addressSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be 10 digits."),

  address: z.string().trim().min(1, "Address is required."),

  city: z.string().trim().min(1, "City is required."),

  state: z.string().trim().min(1, "State is required."),

  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Pincode must be 6 digits."),

  country: z.string().trim().min(1, "Country is required.").default("India"),

  isDefault: z.boolean().optional(),
});

// Update Address
const updateAddressSchema = addressSchema.partial();

// Address ID
const addressIdSchema = z.object({
  id: z.string().min(1, "Address ID is required."),
});

module.exports = {
  signUpSchema,
  logInSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,

  addressSchema,
  updateAddressSchema,
  addressIdSchema,
};