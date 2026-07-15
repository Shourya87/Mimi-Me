const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
    // Get Token From Cookie
    const token = req.cookies.token;

    // Check Token Exists
    if (!token) {
      return res.status(401).json({
        message: "Please login to continue.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await userModel.findById(decoded.id).select("-password");

    // Check User Exists
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    req.user = user;

    // Continue To Next Middleware / Controller
    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protect;