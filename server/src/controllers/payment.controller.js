const razorpay = require("../config/razorpay");

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount.",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `MM-${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

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

module.exports = {
  createRazorpayOrder,
};