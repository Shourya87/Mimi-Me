const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Mimi Me/Products",
    });

    // Delete local file after upload success
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    // Delete local file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

module.exports = uploadImage;
