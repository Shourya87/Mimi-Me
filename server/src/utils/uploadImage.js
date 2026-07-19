const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadImage = async (filePath, folder = "Mimi Me/Products") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

module.exports = uploadImage;