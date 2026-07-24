const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userModel = require("../models/user.model");
const { sendEmail } = require("../utils/send.email");
const otpTemplate = require("../templates/otp.template");
const welcomeTemplate = require("../templates/welcome.template");
const resetPasswordTemplate = require("../templates/resetPassword.template");
const generateToken = require("../utils/generateToken");

// SignUp Logic
const signUp = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields.",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });

    if (newUser) {
      await sendEmail({
        to: email,
        subject: "Welcome to Mimi & Me - Your OTP for Registration",
        html: otpTemplate(name, otp),
      });

      res.status(201).json({
        title: "Welcome to Mimi & Me! 🌸",
        message:
          "We've sent a verification code to your email. Please enter it to continue.",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

// Login Logic
const logIn = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    // Validate Input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields.",
      });
    }

    // Find User
    const user = await userModel.findOne({ email });

    // Check User Exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Validate user
    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your account first.",
      });
    }

    // Check Password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Generate JWT Token
    const token = generateToken(user._id, user.role);

    // Remove Password Before Sending Response
    user.password = undefined;

    // Store JWT in Cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 30 Days
    });

    // Send Response
    return res.status(200).json({
      message: "Login successful.",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

// Otp Logic
const verifyOtp = async (req, res) => {
  try {
    // Get Data
    const { email, otp } = req.body;

    // Validate Input
    if (!email || !otp) {
      return res.status(400).json({
        message: "Pease provide email and OTP.",
      });
    }

    // Find User
    const user = await userModel.findOne({ email });

    // Check User Exists
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    // Check OTP Expiry
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP has expired.",
      });
    }

    // Verify User
    user.verified = true;

    // Clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;

    // Save User
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Welcome to the Mimi & Me Family 🌸",
      html: welcomeTemplate(user.name),
    });

    return res.status(200).json({
      message: "OTP verified successfully. 🎉",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

// Logout Logic
const logOut = async (req, res) => {
  try {
    // Clear JWT Cookie
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

// Get User Logic
const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

// Forgot Password Logic
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    // Generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store hashed token in database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token valid for 15 minutes
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Mimi & Me Password 🔒",
      html: resetPasswordTemplate(user.name, resetLink),
    });

    res.status(200).json({
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Reset Password Logic
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link.",
      });
    }

    // Hash new password
    user.password = await bcrypt.hash(password, 10);

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  logIn,
  verifyOtp,
  logOut,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};