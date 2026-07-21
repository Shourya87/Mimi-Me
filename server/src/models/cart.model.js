const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    selectedSize: {
      type: String,
      default: "",
      trim: true,
    },

    selectedColor: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate items
cartSchema.index(
  {
    user: 1,
    product: 1,
    selectedSize: 1,
    selectedColor: 1,
  },
  { unique: true },
);

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
