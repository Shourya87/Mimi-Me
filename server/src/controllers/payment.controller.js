const crypto = require("crypto");

const razorpay = require("../config/razorpay");
const orderModel = require("../models/order.model");

const createRazorpayOrder = async (req, res) => {
  try {
     console.log("PAYMENT REQUEST BODY:", req.body);

    const { orderId } = req.body;

    console.log("PAYMENT ORDER ID:", orderId);

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required.",
      });
    }

    const order = await orderModel.findOne({
      _id: orderId,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    if (order.paymentMethod !== "Razorpay") {
      return res.status(400).json({
        message: "This order does not use Razorpay.",
      });
    }

    if (order.paymentStatus === "Paid") {
      return res.status(400).json({
        message: "Order is already paid.",
      });
    }

    // Always use the amount stored in our database.
    // Do not trust the amount coming from the frontend.
    const amountInPaise = Math.round(order.totalAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: order.orderNumber,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();

    return res.status(201).json({
      message: "Razorpay order created successfully.",
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);

    return res.status(500).json({
      message: "Unable to create Razorpay order.",
    });
  }
};

const verifyRazorpayPayment = async (req, res) => {

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Payment verification details are required.",
      });
    }

    const order = await orderModel.findOne({
      razorpayOrderId: razorpay_order_id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // Prevent duplicate payment verification
    if (order.paymentStatus === "Paid") {
      return res.status(400).json({
        message: "Payment has already been verified.",
        order,
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValidSignature = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature),
    );

    if (!isValidSignature) {
      order.paymentStatus = "Failed";

      await order.save();

      return res.status(400).json({
        message: "Invalid payment signature.",
      });
    }

    order.paymentStatus = "Paid";
    order.paidAt = new Date();
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    await order.save();

    return res.status(200).json({
      message: "Payment verified successfully.",
      order,
    });
  } catch (error) {
    console.error("Razorpay payment verification error:", error);

    return res.status(500).json({
      message: "Unable to verify payment.",
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment,
};