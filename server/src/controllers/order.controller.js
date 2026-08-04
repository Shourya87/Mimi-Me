const orderModel = require("../models/order.model");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const { sendEmail } = require("../utils/send.email");
const orderTemplate = require("../templates/order.template");

const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { shippingAddress, paymentMethod = "COD" } = req.body;

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        message: "Please provide complete shipping address.",
      });
    }

    const validPaymentMethods = ["COD", "Razorpay"];

    if (!validPaymentMethods.includes(paymentMethod)) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        message: "Invalid payment method.",
      });
    }

    const cart = await cartModel
      .find({ user: req.user._id })
      .populate("product")
      .session(session);

    if (!cart || cart.length === 0) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        message: "Your cart is empty.",
      });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const item of cart) {
      const product = item.product;

      if (!product) {
        await session.abortTransaction();
        session.endSession();

        return res.status(404).json({
          message: "One or more products no longer exist.",
        });
      }

      if (product.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();

        return res.status(400).json({
          message: `${product.title} is out of stock.`,
        });
      }

      const finalPrice = product.discountPrice ?? product.price;

      subtotal += finalPrice * item.quantity;

      orderItems.push({
        product: product._id,
        title: product.title,
        slug: product.slug,
        brand: product.brand,
        image: product.images?.[0]?.url || "",
        price: product.price,
        discountPrice: finalPrice,
        quantity: item.quantity,
      });
    }

    const shippingFee = subtotal >= 999 ? 0 : 99;
    const totalAmount = subtotal + shippingFee;

    const orderNumber = `MM-${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    const [order] = await orderModel.create(
      [
        {
          user: req.user._id,
          orderNumber,
          items: orderItems,
          shippingAddress,
          paymentMethod,
          subtotal,
          shippingFee,
          totalAmount,
        },
      ],
      { session },
    );

    await Promise.all(
      cart.map((item) =>
        productModel.findByIdAndUpdate(
          item.product._id,
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          { session },
        ),
      ),
    );

    await cartModel.deleteMany({ user: req.user._id }, { session });

    await session.commitTransaction();
    session.endSession();

    try {
      await sendEmail({
        to: req.user.email,
        subject: "Your Mimi & Me Order is Confirmed 🎉",
        html: orderTemplate(order),
      });
    } catch (error) {
      console.error(error);
    }

    return res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({
        user: req.user._id,
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order is already cancelled.",
      });
    }

    if (order.orderStatus !== "Pending" && order.orderStatus !== "Confirmed") {
      return res.status(400).json({
        message: "This order can no longer be cancelled.",
      });
    }

    await Promise.all(
      order.items.map((item) =>
        productModel.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        }),
      ),
    );

    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    return res.status(200).json({
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // Prevent updating completed orders
    if (
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        message: `Order is already ${order.orderStatus.toLowerCase()}.`,
      });
    }

    // Update Order Status
    if (orderStatus) {
      const validOrderStatus = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ];

      if (!validOrderStatus.includes(orderStatus)) {
        return res.status(400).json({
          message: "Invalid order status.",
        });
      }

      const allowedTransitions = {
        Pending: ["Confirmed", "Cancelled"],
        Confirmed: ["Shipped", "Cancelled"],
        Shipped: ["Delivered"],
      };

      const allowedNextStatus = allowedTransitions[order.orderStatus] || [];

      if (!allowedNextStatus.includes(orderStatus)) {
        return res.status(400).json({
          message: `Cannot change order status from ${order.orderStatus} to ${orderStatus}.`,
        });
      }

      // Restore stock if admin cancels order
      if (orderStatus === "Cancelled") {
        await Promise.all(
          order.items.map((item) =>
            productModel.findByIdAndUpdate(item.product, {
              $inc: {
                stock: item.quantity,
              },
            }),
          ),
        );
      }

      if (orderStatus === "Delivered") {
        order.deliveredAt = new Date();
      }

      order.orderStatus = orderStatus;
    }

    // Update Payment Status
    if (paymentStatus) {
      const validPaymentStatus = ["Pending", "Paid", "Failed"];

      if (!validPaymentStatus.includes(paymentStatus)) {
        return res.status(400).json({
          message: "Invalid payment status.",
        });
      }

      if (paymentStatus === "Paid" && order.paymentStatus !== "Paid") {
        order.paidAt = new Date();
      }

      order.paymentStatus = paymentStatus;
    }

    await order.save();

    return res.status(200).json({
      message: "Order updated successfully.",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  cancelOrder,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
};
