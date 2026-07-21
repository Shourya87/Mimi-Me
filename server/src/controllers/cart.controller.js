const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");



// Get Item
const getCart = async (req, res) => {
  try {
    const cart = await cartModel.find({ user: req.user._id }).populate(
      "product",
      "title slug price discountPrice images stock"
    );

    res.status(200).json({
      count: cart.length,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Add Item
const addToCart = async (req, res) => {
  try {
    const {
      product,
      quantity = 1,
      selectedSize = "",
      selectedColor = "",
    } = req.body;

    const existingProduct = await productModel.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existingCartItem = await cartModel.findOne({
      user: req.user._id,
      product,
      selectedSize,
      selectedColor,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;

      await existingCartItem.save();

      return res.status(200).json({
        message: "Cart updated successfully",
        cart: existingCartItem,
      });
    }

    const cart = await cartModel.create({
      user: req.user._id,
      product,
      quantity,
      selectedSize,
      selectedColor,
    });

    res.status(201).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Item
const updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity, selectedSize, selectedColor } = req.body;

    const cartItem = await cartModel.findOne({
      _id: cartItemId,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (quantity !== undefined) cartItem.quantity = quantity;
    if (selectedSize !== undefined)
      cartItem.selectedSize = selectedSize;
    if (selectedColor !== undefined)
      cartItem.selectedColor = selectedColor;

    await cartItem.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Remove Item
const removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await cartModel.findOneAndDelete({
      _id: cartItemId,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Clear Cart
const clearCart = async (req, res) => {
  try {
    await cartModel.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};