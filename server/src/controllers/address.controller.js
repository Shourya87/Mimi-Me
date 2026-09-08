const userModel = require("../models/user.model");

// Add Address
const addAddress = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        title: "User Not Found",
        message: "User account not found.",
      });
    }

    const address = req.body;

    // If this is the first address, make it default.
    const shouldBeDefault =
      user.addresses.length === 0 || address.isDefault === true;

    // Remove default status from existing addresses.
    if (shouldBeDefault) {
      user.addresses.forEach((item) => {
        item.isDefault = false;
      });
    }

    user.addresses.push({
      ...address,
      isDefault: shouldBeDefault,
    });

    await user.save();

    const newAddress = user.addresses[user.addresses.length - 1];

    return res.status(201).json({
      title: "Address Added",
      message: "Address added successfully.",
      address: newAddress,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to add address.",
    });
  }
};

// Get All Addresses
const getAddresses = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("addresses");

    if (!user) {
      return res.status(404).json({
        title: "User Not Found",
        message: "User account not found.",
      });
    }

    return res.status(200).json({
      title: "Addresses Fetched",
      message: "Addresses fetched successfully.",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to fetch addresses.",
    });
  }
};

// Update Address
const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        title: "User Not Found",
        message: "User account not found.",
      });
    }

    const address = user.addresses.id(id);

    if (!address) {
      return res.status(404).json({
        title: "Address Not Found",
        message: "Address not found.",
      });
    }

    const { isDefault, ...addressData } = req.body;

    Object.assign(address, addressData);

    // If updated address becomes default,
    // remove default status from all other addresses.
    if (isDefault === true) {
      user.addresses.forEach((item) => {
        item.isDefault = item._id.toString() === id;
      });
    } else if (isDefault === false) {
      address.isDefault = false;

      // Keep one address as default if possible.
      const hasDefaultAddress = user.addresses.some(
        (item) => item.isDefault,
      );

      if (!hasDefaultAddress && user.addresses.length > 0) {
        user.addresses[0].isDefault = true;
      }
    }

    await user.save();

    return res.status(200).json({
      title: "Address Updated",
      message: "Address updated successfully.",
      address,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to update address.",
    });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        title: "User Not Found",
        message: "User account not found.",
      });
    }

    const address = user.addresses.id(id);

    if (!address) {
      return res.status(404).json({
        title: "Address Not Found",
        message: "Address not found.",
      });
    }

    const wasDefault = address.isDefault;

    user.addresses.pull(id);

    // If the deleted address was default,
    // assign default status to the first remaining address.
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    return res.status(200).json({
      title: "Address Deleted",
      message: "Address deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to delete address.",
    });
  }
};

// Set Default Address
const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        title: "User Not Found",
        message: "User account not found.",
      });
    }

    const address = user.addresses.id(id);

    if (!address) {
      return res.status(404).json({
        title: "Address Not Found",
        message: "Address not found.",
      });
    }

    user.addresses.forEach((item) => {
      item.isDefault = item._id.toString() === id;
    });

    await user.save();

    return res.status(200).json({
      title: "Default Address Updated",
      message: "Default address updated successfully.",
      address,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      title: "Server Error",
      message: "Unable to update default address.",
    });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};