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



// {
//   "_id": {
//     "$oid": "6a61e441f2c52153d72222af"
//   },
//   "user": {
//     "$oid": "6a57999212bbacac0264b12a"
//   },
//   "product": {
//     "$oid": "6a593254daac7fb2abc96536"
//   },
//   "createdAt": {
//     "$date": "2026-07-22T18:40:48.172Z"
//   },
//   "updatedAt": {
//     "$date": "2026-07-23T10:11:49.565Z"
//   },
//   "__v": 0
// }