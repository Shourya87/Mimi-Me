const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required."],
      unique: true,
      uppercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    discountType: {
      type: String,
      required: [true, "Discount type is required."],
      enum: ["percentage", "fixed"],
    },

    discountValue: {
      type: Number,
      required: [true, "Discount value is required."],
      min: 0,
    },

    minimumOrderValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    maxDiscount: {
      type: Number,
      default: null,
      min: 0,
    },

    usageLimit: {
      type: Number,
      default: null,
      min: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Validate percentage discounts
couponSchema.pre("validate", function () {
  if (this.discountType === "percentage" && this.discountValue > 100) {
    throw new Error("Percentage discount cannot exceed 100%.");
  }
});

const couponModel = mongoose.model("Coupon", couponSchema);
module.exports = couponModel;
