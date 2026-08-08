const { z } = require("zod");

const addCartSchema = z.object({
  product: z.string().min(1, "Product is required."),

  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1.")
    .default(1),

  selectedSize: z.string().trim().optional().default(""),

  selectedColor: z.string().trim().optional().default(""),
});

const updateCartSchema = z.object({
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1.")
    .optional(),

  selectedSize: z.string().trim().optional(),

  selectedColor: z.string().trim().optional(),
});

module.exports = {
  addCartSchema,
  updateCartSchema,
};
