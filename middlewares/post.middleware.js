const cloudinary = require("../utils/cloudinary");

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const postImageCellsMiddleware = async (req, res, next) => {
    try {
        const body = req.body;
        const cells = [];
        if (isJson(body.cells)) {
            cells = JSON.parse(body.cells);
        } else {
            cells = body.cells;
        }

        const files = req.files;
        for (let i in files) {
            if (files[i].fieldname.includes("banner")) {
                req.body.banner = files[i];
            }
            if (files[i].fieldname.includes("cellImage_")) {
                const index = parseInt(files[i].fieldname.slice(-1));
                for (let j in cells) {
                    console.log(index, parseInt(cells[j].value));
                    if (
                        cells[j].type === "image" &&
                        parseInt(cells[j].value) === index
                    ) {
                        cells[j].value = files[i];
                    }
                }
            }
        }
        console.log(cells);
        req.body.cells = cells;
        next();
    } catch (error) {
        throw error;
    }
};

const uploadToCloudinary = async (req, res, next) => {
    try {
        const banner = req.body.banner;
        const cells = req.body.cells;
        const bannerUpload = await cloudinary.uploader.upload(banner.path, {
            use_filename: true,
            folder: `posts/${req.user.id}`,
        });

        const bannerLink = bannerUpload.url;
        for (let i in cells) {
            if (cells[i].type === "image") {
                const cellImage = cells[i].value;
                let cellImageUpload;
                try {
                    cellImageUpload = await cloudinary.uploader.upload(
                        cellImage.path,
                        { use_filename: true, folder: `posts/${req.user.id}` }
                    );
                } catch (error) {
                    console.log(error);
                }

                cells[i].value = cellImageUpload.url;
            }
        }
        req.body.banner = bannerLink;
        req.body.cells = cells;
        next();
    } catch (error) {
        throw error;
    }
};

module.exports = { postImageCellsMiddleware, uploadToCloudinary };
