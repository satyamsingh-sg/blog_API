const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        if (
            file.fieldname === "banner" ||
            file.fieldname.includes("cellImage")
        ) {
            callback(null, "uploads/posts");
        }
        if (file.fieldname === "screenshot") {
            callback(null, "uploads/questions");
        } else {
            callback(null, "uploads/others");
        }
    },
    filename: function (request, file, callback) {
        let folder = "";
        if (
            file.fieldname === "banner" ||
            file.fieldname.includes("cellImage")
        ) {
            folder = "posts";
        }
        if (file.fieldname === "screenshot") {
            folder = "questions";
        } else {
            folder = "others";
        }
        callback(
            null,
            new Date().getTime().toString() +
                "-" +
                file.fieldname +
                "-" +
                request.user.id +
                "-" +
                folder +
                "-" +
                file.originalname
        );
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
