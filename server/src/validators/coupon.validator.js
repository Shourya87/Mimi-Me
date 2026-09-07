const { z } = require("zod");

const couponSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, "Coupon code must be at least 3 characters.")
    .max(30, "Coupon code cannot exceed 30 characters.")
    .transform((value) => value.toUpperCase()),

  discountType: z.enum(["percentage", "fixed"], {
    message: "Discount type must be percentage or fixed.",
  }),

  discountValue: z.coerce
    .number()
    .min(0, "Discount value cannot be negative."),

  minimumOrderValue: z.coerce
    .number()
    .min(0, "Minimum order value cannot be negative.")
    .optional(),

  maxDiscount: z.coerce
    .number()
    .min(0, "Maximum discount cannot be negative.")
    .nullable()
    .optional(),

  usageLimit: z.coerce
    .number()
    .int("Usage limit must be a whole number.")
    .min(1, "Usage limit must be at least 1.")
    .nullable()
    .optional(),

  expiresAt: z
    .string()
    .datetime()
    .nullable()
    .optional(),

  isActive: z.boolean().optional(),
});

const validateCouponRules = (data, ctx) => {
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

  if (
    data.discountType === "fixed" &&
    data.maxDiscount !== null &&
    data.maxDiscount !== undefined
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["maxDiscount"],
      message:
        "Maximum discount is only applicable to percentage discounts.",
    });
  }
};

const createCouponValidator = couponSchema.superRefine(validateCouponRules);

const updateCouponValidator = couponSchema
  .partial()
  .superRefine(validateCouponRules);

module.exports = {
  createCouponValidator,
  updateCouponValidator,
};