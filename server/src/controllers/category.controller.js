const categoryModel = require("../models/category.model");
const slugify = require("slugify");
const deleteImage = require("../utils/deleteImage");
const uploadImage = require("../utils/uploadImage");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        title: "Validation Error",
        message: "Category name is required.",
      });
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const existingCategory = await categoryModel.findOne({ slug });

    if (existingCategory) {
      return res.status(409).json({
        title: "Category Already Exists",
        message: "A category with this name already exists.",
      });
    }

    let image = {
      url: "",
      public_id: "",
    };

    if (req.file) {
      const result = await uploadImage(req.file.path, "Mimi Me/Categories");

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const category = await categoryModel.create({
      name,
      slug,
      image,
    });

    return res.status(201).json({
      title: "Category Created",
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({}).sort({
      order: 1,
    });

    return res.status(200).json({
      title: "Categories Fetched",
      message:
        categories.length > 0
          ? "Categories fetched successfully."
          : "No categories found.",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoryModel.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        title: "Category Not Found",
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      title: "Category Fetched",
      message: "Category fetched successfully.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        title: "Category Not Found",
        message: "Category not found.",
      });
    }

    if (name) {
      const slug = slugify(name, {
        lower: true,
        strict: true,
      });

      const existingCategory = await categoryModel.findOne({
        slug,
        _id: { $ne: id },
      });

      if (existingCategory) {
        return res.status(409).json({
          title: "Category Already Exists",
          message: "Another category with this name already exists.",
        });
      }

      category.name = name;
      category.slug = slug;
    }

    if (req.file) {
      if (category.image.public_id) {
        await deleteImage(category.image.public_id);
      }

      const uploadedImage = await uploadImage(
        req.file.path,
        "Mimi Me/Categories",
      );

      category.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    await category.save();

    return res.status(200).json({
      title: "Category Updated",
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        title: "Category Not Found",
        message: "Category not found.",
      });
    }

    if (category.image.public_id) {
      await deleteImage(category.image.public_id);
    }

    await category.deleteOne();

    return res.status(200).json({
      title: "Category Deleted",
      message: "Category deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
