const { z } = require("zod");

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required.")
    .max(20, "Category name must be at most 20 characters long."),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required.")
    .max(20, "Category name must be at most 20 characters long.")
    .optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
