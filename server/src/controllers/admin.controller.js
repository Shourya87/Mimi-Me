const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");



// Dashboard Stats
const getDashboardStats = async (req, res) => {

  console.log("Fetching dashboard statistics...");

  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      deliveredOrders,
      pendingOrders,
      cancelledOrders,
      revenueResult,
    ] = await Promise.all([
      userModel.countDocuments(),
      productModel.countDocuments(),
      orderModel.countDocuments(),
      orderModel.countDocuments({ orderStatus: "Delivered" }),
      orderModel.countDocuments({
        orderStatus: { $in: ["Pending", "Processing", "Shipped"] },
      }),
      orderModel.countDocuments({ orderStatus: "Cancelled" }),
      orderModel.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
            orderStatus: { $ne: "Cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    return res.status(200).json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        deliveredOrders,
        pendingOrders,
        cancelledOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to fetch dashboard statistics.",
    });
  }
};



// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find()
      .select("-password -otp -otpExpiry -resetPasswordToken -resetPasswordExpiry")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to fetch users.",
    });
  }
};



// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin deleting own account
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        title: "Action Not Allowed",
        message: "You cannot delete your own account.",
      });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        title: "User Not Found",
        message: "User does not exist.",
      });
    }

    // Prevent deleting another admin
    if (user.role === "admin") {
      return res.status(403).json({
        title: "Access Denied",
        message: "Admin accounts cannot be deleted.",
      });
    }

    await userModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to delete user.",
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
};