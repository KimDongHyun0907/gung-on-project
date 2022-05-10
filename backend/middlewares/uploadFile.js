const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require('dotenv').config();
const connection_string = process.env.CONNECTION_STRING

var storage = new GridFsStorage({
    url: connection_string,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg", "image/jfif"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-gungon-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: "images",
            filename: `${Date.now()}-gungon-${file.originalname}`
        };
    }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;