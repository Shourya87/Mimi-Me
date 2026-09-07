const mongoose = require("mongoose");
const couponModel = require("../models/coupon.model");

// Create Coupon
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minimumOrderValue,
      maxDiscount,
      expiresAt,
      usageLimit,
      isActive,
    } = req.body;

    if (!code) {
      return res.status(400).json({
        title: "Invalid Coupon",
        message: "Coupon code is required.",
      });
    }

    const normalizedCode = code.trim().toUpperCase();

    const existingCoupon = await couponModel.findOne({
      code: normalizedCode,
    });

    if (existingCoupon) {
      return res.status(409).json({
        title: "Coupon Exists",
        message: "A coupon with this code already exists.",
      });
    }

    const coupon = await couponModel.create({
      code: normalizedCode,
      discountType,
      discountValue,
      minimumOrderValue,
      maxDiscount,
      expiresAt,
      usageLimit,
      isActive,
    });

    return res.status(201).json({
      title: "Coupon Created",
      message: "Coupon created successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Create coupon error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        title: "Coupon Exists",
        message: "A coupon with this code already exists.",
      });
    }

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to create coupon.",
    });
  }
};

// Get All Coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await couponModel
      .find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      title: "Coupons Fetched",
      message: "Coupons fetched successfully.",
      coupons,
    });
  } catch (error) {
    console.error("Get coupons error:", error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to fetch coupons.",
    });
  }
};

// Get Coupon By ID
const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        title: "Invalid Coupon ID",
        message: "Invalid coupon ID.",
      });
    }

    const coupon = await couponModel.findById(id);

    if (!coupon) {
      return res.status(404).json({
        title: "Coupon Not Found",
        message: "Coupon not found.",
      });
    }

    return res.status(200).json({
      title: "Coupon Fetched",
      message: "Coupon fetched successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Get coupon error:", error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to fetch coupon.",
    });
  }
};

// Get Coupon By Code
const getCouponByCode = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code?.trim()) {
      return res.status(400).json({
        title: "Invalid Coupon",
        message: "Coupon code is required.",
      });
    }

    const normalizedCode = code.trim().toUpperCase();

    const coupon = await couponModel.findOne({
      code: normalizedCode,
    });

    if (!coupon) {
      return res.status(404).json({
        title: "Coupon Not Found",
        message: "Invalid coupon code.",
      });
    }

    return res.status(200).json({
      title: "Coupon Fetched",
      message: "Coupon fetched successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Get coupon by code error:", error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to fetch coupon.",
    });
  }
};

// Validate Coupon
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code?.trim()) {
      return res.status(400).json({
        title: "Invalid Coupon",
        message: "Coupon code is required.",
      });
    }

    const amount = Number(orderAmount);

    if (!Number.isFinite(amount) || amount < 0) {
      return res.status(400).json({
        title: "Invalid Order Amount",
        message: "Please provide a valid order amount.",
      });
    }

    const normalizedCode = code.trim().toUpperCase();

    const coupon = await couponModel.findOne({
      code: normalizedCode,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        title: "Invalid Coupon",
        message: "Coupon code is invalid.",
      });
    }

    // Check expiry
    if (
      coupon.expiresAt &&
      new Date(coupon.expiresAt) <= new Date()
    ) {
      return res.status(400).json({
        title: "Coupon Expired",
        message: "This coupon has expired.",
      });
    }

    // Check usage limit
    if (
      coupon.usageLimit !== null &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      return res.status(400).json({
        title: "Coupon Limit Reached",
        message: "This coupon usage limit has been reached.",
      });
    }

    // Check minimum order value
    if (amount < coupon.minimumOrderValue) {
      return res.status(400).json({
        title: "Minimum Order Amount Required",
        message: `Minimum order amount for this coupon is ₹${coupon.minimumOrderValue}.`,
        minimumOrderValue: coupon.minimumOrderValue,
      });
    }

    let discountAmount = 0;

    // Percentage discount
    if (coupon.discountType === "percentage") {
      discountAmount =
        (amount * coupon.discountValue) / 100;

      if (
        coupon.maxDiscount !== null &&
        coupon.maxDiscount !== undefined
      ) {
        discountAmount = Math.min(
          discountAmount,
          coupon.maxDiscount,
        );
      }
    }

    // Fixed discount
    else if (coupon.discountType === "fixed") {
      discountAmount = coupon.discountValue;
    }

    // Prevent discount from exceeding order amount
    discountAmount = Math.min(discountAmount, amount);

    // Avoid floating point issues
    discountAmount = Number(discountAmount.toFixed(2));

    const finalAmount = Number(
      Math.max(amount - discountAmount, 0).toFixed(2),
    );

    return res.status(200).json({
      title: "Coupon Valid",
      message: "Coupon applied successfully.",

      coupon: {
        id: coupon._id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },

      orderAmount: amount,
      discountAmount,
      finalAmount,
    });
  } catch (error) {
    console.error("Validate coupon error:", error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to validate coupon.",
    });
  }
};

// Update Coupon
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        title: "Invalid Coupon ID",
        message: "Invalid coupon ID.",
      });
    }

    const updateData = {
      ...req.body,
    };

    // Normalize code
    if (updateData.code) {
      updateData.code = updateData.code
        .trim()
        .toUpperCase();

      const existingCoupon = await couponModel.findOne({
        code: updateData.code,
        _id: { $ne: id },
      });

      if (existingCoupon) {
        return res.status(409).json({
          title: "Coupon Exists",
          message: "A coupon with this code already exists.",
        });
      }
    }

    const coupon = await couponModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!coupon) {
      return res.status(404).json({
        title: "Coupon Not Found",
        message: "Coupon not found.",
      });
    }

    return res.status(200).json({
      title: "Coupon Updated",
      message: "Coupon updated successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Update coupon error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        title: "Coupon Exists",
        message: "A coupon with this code already exists.",
      });
    }

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to update coupon.",
    });
  }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        title: "Invalid Coupon ID",
        message: "Invalid coupon ID.",
      });
    }

    const coupon = await couponModel.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({
        title: "Coupon Not Found",
        message: "Coupon not found.",
      });
    }

    return res.status(200).json({
      title: "Coupon Deleted",
      message: "Coupon deleted successfully.",
    });
  } catch (error) {
    console.error("Delete coupon error:", error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to delete coupon.",
    });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  getCouponById,
  validateCoupon,
  updateCoupon,
  deleteCoupon,
};