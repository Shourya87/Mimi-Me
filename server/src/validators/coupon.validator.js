const { z } = require("zod");

const createCouponValidator = z.object({
  code: z
    .string()
    .trim()
    .min(3, "Coupon code must be at least 3 characters.")
    .max(30, "Coupon code cannot exceed 30 characters.")
    .transform((value) => value.toUpperCase()),

  discountType: z.enum(["percentage", "fixed"], {
    message: "Discount type must be percentage or fixed.",
  }),

  discountValue: z
    .number()
    .min(0, "Discount value cannot be negative."),

  minimumOrderValue: z
    .number()
    .min(0, "Minimum order value cannot be negative.")
    .optional(),

  usageLimit: z
    .number()
    .int("Usage limit must be a whole number.")
    .min(1, "Usage limit must be at least 1.")
    .nullable()
    .optional(),

  expiryDate: z
    .string()
    .datetime()
    .nullable()
    .optional(),

  isActive: z
    .boolean()
    .optional(),
}).superRefine((data, ctx) => {
  if (
    data.discountType === "percentage" &&
    data.discountValue > 100
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["discountValue"],
      message: "Percentage discount cannot exceed 100%.",
    });
  }
});

const updateCouponValidator = createCouponValidator.partial();

module.exports = {
  createCouponValidator,
  updateCouponValidator,
};