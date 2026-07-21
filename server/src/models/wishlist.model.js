const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate items
wishlistSchema.index(
  {
    user: 1,
    product: 1,
  },
  { unique: true },
);

const wishlistModel = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlistModel;
