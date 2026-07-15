const productModel = require("../models/product.model");
const uploadImage = require("../utils/uploadImage");
const slugify = require("slugify");

// Create Product
const createProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    discountPrice,
    brand,
    category,
    sizes,
    colors,
    stock,
    isFeatured,
  } = req.body;

  try {
    if (!title || !description || !price || !brand || !category) {
      return res.status(400).json({
        title: "Missing Information",
        message: "Pease fill all required fields.",
      });
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const existingProduct = await productModel.findOne({ slug });

    if (existingProduct) {
      return res.status(409).json({
        title: "Product Already Exists",
        message: "A product with this title already exists.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        title: "Image Required",
        message: "Please upload at least one product image.",
      });
    }

    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadImage(file.path);
        return result.secure_url;
      }),
    );

    const product = await productModel.create({
      title,
      slug,
      description,
      price,
      discountPrice,
      brand,
      category,
      sizes,
      colors,
      stock,
      images: imageUrls,
      isFeatured,
    });

    return res.status(201).json({
      title: "Product Created",
      message: "Product created successfully.",
      product,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      title: "Internal Server Error",
      message: "Something went wrong.",
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  return res.status(200).json({
    message: "Api working",
  })
};

// Get Product by Slug
const getProductBySlug = async (req, res) => {};

// Update Product
const updateProduct = async (req, res) => {};

// Delete Product
const deleteProduct = async (req, res) => {};

module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
