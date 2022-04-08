const cloudinary = require("../utils/cloudinary");

const uploadToCloudinary = async (req, res, next) => {
    try {
        const screenshot = req.file;
        const screenshotUpload = await cloudinary.uploader.upload(
            screenshot.path,
            {
                use_filename: true,
                folder: `questions/${req.user.id}`,
            }
        );
        req.body.screenshot = screenshotUpload.url;
        next();
    } catch (error) {
        throw error;
    }
};

module.exports = { uploadToCloudinary };
