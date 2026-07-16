const productModel = require("../models/product.model");
const uploadImage = require("../utils/uploadImage");
const deleteImage = require("../utils/deleteImage");
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
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
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
  try {
    const products = await productModel.find();

    return res.status(200).json({
      title: "Products Fetched",
      message:
        products.length > 0
          ? "Products fetched successfully."
          : "No products found.",
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      title: "Internal Server Error",
      message: "Something went wrong.",
    });
  }
};

// Get Product by Slug
const getProductBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await productModel.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        title: "Product Not Found",
        message: "The requested product does not exist.",
      });
    }

    return res.status(200).json({
      title: "Product Fetched",
      message: "Product fetched successfully.",
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

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;

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

  console.log(title);

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        title: "Product Not Found",
        message: "Product does not exist.",
      });
    }

    if (title && title !== product.title) {
      const slug = slugify(title, {
        lower: true,
        strict: true,
      });

      const existingProduct = await productModel.findOne({
        slug,
        _id: { $ne: id },
      });

      if (existingProduct) {
        return res.status(409).json({
          title: "Duplicate Product",
          message: "A product with this title already exists.",
        });
      }

      product.title = title;
      product.slug = slug;
    }

    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (sizes) product.sizes = sizes;
    if (colors) product.colors = colors;
    if (stock !== undefined) product.stock = stock;
    if (isFeatured !== undefined) product.isFeatured = isFeatured;

    // Upload new & Delete old images
    if (req.files && req.files.length > 0) {
      const oldImages = product.images;

      const newImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await uploadImage(file.path);

          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        }),
      );

      for (const image of oldImages) {
        await deleteImage(image.public_id);
      }

      product.images = newImages;
    }

    await product.save();

    return res.status(200).json({
      title: "Product Updated",
      message: "Product updated successfully.",
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

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        title: "Product Not Found",
        message: "The requested product does not exist.",
      });
    }

    for (const image of product.images) {
      await deleteImage(image.public_id);
    }

    await product.deleteOne();

    return res.status(200).json({
      title: "Product Deleted",
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      title: "Internal Server Error",
      message: "Something went wrong.",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
