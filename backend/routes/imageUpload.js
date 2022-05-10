const multer  = require('multer');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const jwt_decode = require('jwt-decode');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth.js');
const router = express.Router();
const Image = require('../models/image');

router.use(express.json());

const storage = multer.diskStorage({
    destination: './images/', //Directory of where images are stored.
    filename: function(req, file, cb){
        cb(null, "gungon" + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000}, //File size limit 10 MB.
    fileFilter: function (req, file, cb) { //PNG, JPG, JPEG  X GIF, JFIF
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Invalid file format!'));
        }
    }
});

router.use('/images', express.static('images'));

router.get('/upload_gallery', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/upload.html'));
});

router.post('/upload_gallery', auth, upload.single('imagefile'), function (req, res, next) {
    var user_token = req.cookies.access_token
    var token_decoded = jwt_decode(user_token)
    var bodyinput = req.body
    try {
        const image = Image.create({
            url: "http://localhost:5000/images/" + req.file.filename,
            user: token_decoded.username
        });
    } catch (error) {
        console.log(error);
    }
    res.json({ url: "http://localhost:5000/images/"+req.file.filename, user: token_decoded.username });
});

module.exports = router;