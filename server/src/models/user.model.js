const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits."],
    },

    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required."],
      trim: true,
    },

    state: {
      type: String,
      required: [true, "State is required."],
      trim: true,
    },

    pincode: {
      type: String,
      required: [true, "Pincode is required."],
      trim: true,
      match: [/^\d{6}$/, "Pincode must be 6 digits."],
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters long."],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    phone: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits."],
    },

    profileImage: {
      type: String,
      trim: true,
      default: "",
    },

    addresses: {
      type: [addressSchema],
      default: [],
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;