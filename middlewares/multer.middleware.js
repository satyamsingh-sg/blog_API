const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, `uploads/${request.headers.folder}`);
    },
    filename: function (request, file, callback) {
        callback(
            null,
            new Date().getTime().toString() +
                "-" +
                file.fieldname +
                "-" +
                request.user.id +
                "-" +
                request.headers.folder +
                "-" +
                file.originalname
        );
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
