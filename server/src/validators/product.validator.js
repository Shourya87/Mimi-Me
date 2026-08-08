const { z } = require("zod");

const productFields = {
  title: z
    .string()
    .trim()
    .min(3, "Product title must be at least 3 characters long.")
    .max(100, "Product title must be at most 100 characters long."),

  description: z
    .string()
    .trim()
    .min(20, "Product description must be at least 20 characters long.")
    .max(2000, "Product description must be at most 2000 characters long."),

  price: z.coerce.number().min(0, "Price cannot be negative."),

  discountPrice: z.coerce
    .number()
    .min(0, "Discount price cannot be negative.")
    .optional(),

  brand: z.string().trim().min(1, "Brand is required."),

  category: z.string().trim().min(1, "Category is required."),

  sizes: z.array(z.string().trim()).optional(),

  colors: z.array(z.string().trim()).optional(),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number.")
    .min(0, "Stock cannot be negative.")
    .optional(),

  isFeatured: z.coerce.boolean().optional(),
};

const createProductSchema = z.object({
  ...productFields,
});

const updateProductSchema = z.object({
  title: productFields.title.optional(),
  description: productFields.description.optional(),
  price: productFields.price.optional(),
  discountPrice: productFields.discountPrice,
  brand: productFields.brand.optional(),
  category: productFields.category.optional(),
  sizes: productFields.sizes,
  colors: productFields.colors,
  stock: productFields.stock,
  isFeatured: productFields.isFeatured,
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
