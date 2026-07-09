const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const { sendEmail } = require("../utils/send.email");
const generateToken = require("../utils/generateToken");

// SignUp Logic
const signUp = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields.",
      });
    }

    // Check if user already exists
    const existingUser = await UserActivation.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hast(password, 10);

    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (newUser) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

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
          "User registered successfully. Please check your email for the OTP.",
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

const logIn = async (req, res) => {};

module.exports = { signUp, logIn };
