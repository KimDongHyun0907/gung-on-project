const multer  = require('multer');
const express = require('express');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './images/', //Directory of where images are stored.
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 4000000}, //File size limit 4 MB.
    fileFilter: function (req, file, cb) { //PNG, JPG, JPEG, GIF, JFIF
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "image/jfif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Invalid file format!'));
        }
    }
});

router.use('/images', express.static('images'));

router.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/picture-home.html'));
});

router.post('/upload', upload.single('user_image'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "File uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
});

module.exports = router;