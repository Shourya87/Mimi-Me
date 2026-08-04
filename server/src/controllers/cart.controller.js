const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

// Get Item
const getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .find({ user: req.user._id })
      .populate("product", "title slug price discountPrice images stock");

    res.status(200).json({
      count: cart.length,
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Item
const addCart = async (req, res) => {
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

    if (quantity > existingProduct.stock) {
      return res.status(400).json({
        message: `Only ${existingProduct.stock} item(s) are available in stock.`,
      });
    }

    const existingCartItem = await cartModel.findOne({
      user: req.user._id,
      product,
      selectedSize,
      selectedColor,
    });

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;

      if (newQuantity > existingProduct.stock) {
        return res.status(400).json({
          message: `Only ${existingProduct.stock} item(s) are available in stock.`,
        });
      }

      existingCartItem.quantity = newQuantity;

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
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Update Item
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, selectedSize, selectedColor } = req.body;

    const cartItem = await cartModel.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (quantity !== undefined) cartItem.quantity = quantity;
    if (selectedSize !== undefined) cartItem.selectedSize = selectedSize;
    if (selectedColor !== undefined) cartItem.selectedColor = selectedColor;

    const product = await productModel.findById(cartItem.product);

    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} item(s) are available in stock.`,
      });
    }

    await cartItem.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart: cartItem,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Remove Item
const removeCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await cartModel.findOneAndDelete({
      _id: id,
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
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
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
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getCart,
  addCart,
  updateCart,
  removeCart,
  clearCart,
};
