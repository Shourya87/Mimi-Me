const wishlistModel = require("../models/wishlist.model.js");
const productModel = require("../models/product.model.js");




// Get Item
const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistModel.find({
      user: req.user._id,
    }).populate("product", "title slug price discountPrice images stock");

    res.status(200).json({
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Add Item
const addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;

    const existingProduct = await productModel.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existingWishlistItem = await wishlistModel.findOne({
      user: req.user._id,
      product,
    });

    if (existingWishlistItem) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const wishlist = await wishlistModel.create({
      user: req.user._id,
      product,
    });

    res.status(201).json({
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Remove Item
const removeFromWishlist = async (req, res) => {
  try {
    const { wishlistItemId } = req.params;

    const wishlist = await wishlistModel.findOneAndDelete({
      _id: wishlistItemId,
      user: req.user._id,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      message: "Product removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Clear wishlist
const clearWishlist = async (req, res) => {
  try {
    await wishlistModel.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      message: "Wishlist cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};  



module.exports = {
    getWishlist,
    addToWishlist,  
    removeFromWishlist,
    clearWishlist,
};