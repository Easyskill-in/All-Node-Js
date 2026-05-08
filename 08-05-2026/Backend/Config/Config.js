require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017",
};