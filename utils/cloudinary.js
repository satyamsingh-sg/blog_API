const cloudinary = require("cloudinary");

cloudinary.v2.config({
    cloud_name: process.env.BLG_CLOUDINARY_CLOUD_ALIAS,
    api_key: process.env.BLG_CLOUDINARY_API_KEY,
    api_secret: process.env.BLG_CLOUDINARY_API_SECRET,
});

module.exports = cloudinary.v2;
