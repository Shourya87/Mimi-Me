const { z } = require("zod");

const shippingAddressSchema = z.object({
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
});

const createOrderSchema = z.object({
  shippingAddress: shippingAddressSchema,

  paymentMethod: z.enum(["COD", "Razorpay"]).default("COD"),
});

const updateOrderStatusSchema = z
  .object({
    orderStatus: z
      .enum(["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"])
      .optional(),

    paymentStatus: z.enum(["Pending", "Paid", "Failed"]).optional(),
  })
  .refine(
    (data) =>
      data.orderStatus !== undefined || data.paymentStatus !== undefined,
    {
      message: "At least one order status or payment status is required.",
    },
  );

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
};
