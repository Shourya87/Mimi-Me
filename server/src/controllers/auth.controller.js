const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const { sendEmail } = require("../utils/send.email");
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
      const message = `
      Welcome to Mimi & Me, ${name}!
      Your OTP for Mimi & Me registration is: ${otp}
      `;

      await sendEmail(
        email,
        "Welcome to Mimi & Me - Your OTP for Registration",
        message,
      );

      res.status(201).json({
        message:
          `Your account has been created successfully! 🌸
          We've sent a verification code to your email. Please enter it to continue.`,
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

    return res.status(200).json({
      message: "OTP verified successfully.",
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

module.exports = { signUp, logIn, verifyOtp, logOut, getCurrentUser };
