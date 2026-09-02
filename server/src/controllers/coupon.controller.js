const couponModel = require("../models/coupon.model");

// Create Coupon
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      expiresAt,
      usageLimit,
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
      minOrderAmount,
      maxDiscount,
      expiresAt,
      usageLimit,
    });

    return res.status(201).json({
      title: "Coupon Created",
      message: "Coupon created successfully.",
      coupon,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

// Get All Coupons
const getAllCoupons = async (req, res) => {
  try {
    // console.log("METHOD:", req.method);
    // console.log("PARAMS:", req.params);
    // console.log("BODY:", req.body);
    // console.log("HEADERS:", req.headers);

    const coupons = await couponModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      title: "Coupons Fetched",
      message: "Coupons fetched successfully.",
      coupons,
    });
  } catch (error) {
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

// Get Coupon By ID
const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;

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
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

// Get Coupon By Code
const getCouponByCode = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
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
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

// Validate Coupon
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code) {
      return res.status(400).json({
        title: "Invalid Coupon",
        message: "Coupon code is required.",
      });
    }

    const normalizedCode = code.trim().toUpperCase();

    const amount = Number(orderAmount);

    if (Number.isNaN(amount) || amount < 0) {
      return res.status(400).json({
        title: "Invalid Order Amount",
        message: "Please provide a valid order amount.",
      });
    }

    const coupon = await couponModel.findOne({
      code: normalizedCode,
    });

    if (!coupon) {
      return res.status(404).json({
        title: "Invalid Coupon",
        message: "Coupon code is invalid.",
      });
    }

    // Check expiry
    if (coupon.expiresAt && new Date(coupon.expiresAt) <= new Date()) {
      return res.status(400).json({
        title: "Coupon Expired",
        message: "This coupon has expired.",
      });
    }

    // Check usage limit
    if (
      coupon.usageLimit !== null &&
      coupon.usageLimit !== undefined &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      return res.status(400).json({
        title: "Coupon Limit Reached",
        message: "This coupon usage limit has been reached.",
      });
    }

    // Check minimum order amount
    if (
      coupon.minOrderAmount !== null &&
      coupon.minOrderAmount !== undefined &&
      amount < coupon.minOrderAmount
    ) {
      return res.status(400).json({
        title: "Minimum Order Amount Required",
        message: `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}.`,
        minOrderAmount: coupon.minOrderAmount,
      });
    }

    let discountAmount = 0;

    // Percentage discount
    if (coupon.discountType === "percentage") {
      discountAmount = (amount * coupon.discountValue) / 100;

      // Apply maximum discount limit
      if (
        coupon.maxDiscount !== null &&
        coupon.maxDiscount !== undefined &&
        discountAmount > coupon.maxDiscount
      ) {
        discountAmount = coupon.maxDiscount;
      }
    }

    // Fixed discount
    else if (coupon.discountType === "fixed") {
      discountAmount = coupon.discountValue;
    } else {
      return res.status(400).json({
        title: "Invalid Coupon",
        message: "Invalid discount type.",
      });
    }

    // Discount can never be greater than order amount
    discountAmount = Math.min(discountAmount, amount);

    // Avoid floating point issues
    discountAmount = Number(discountAmount.toFixed(2));

    const finalAmount = Number(Math.max(amount - discountAmount, 0).toFixed(2));

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
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

// Update Coupon
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    // Normalize coupon code if it is being updated
    const updateData = { ...req.body };

    if (updateData.code) {
      updateData.code = updateData.code.trim().toUpperCase();

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

    const coupon = await couponModel.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

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
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
    });
  }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

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
    return res.status(500).json({
      title: "Server Error",
      message: error.message,
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
