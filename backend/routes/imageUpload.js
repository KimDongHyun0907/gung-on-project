const multer  = require('multer');
const express = require('express');
const path = require('path');
const request = require('request');
const jwt_decode = require('jwt-decode');
const auth = require('../middlewares/auth.js');
const router = express.Router();
const Image = require('../models/image');
const fs = require('fs');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

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
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Invalid file format!'));
        }
    }
});

router.use('/images', express.static('images'));

router.get('/call_db', async (req, res) => {
    try{
        const image = await Image.find();
        res.json(image);
    } catch (error) {
        console.log(error);
    }
});

router.get('/upload_gallery', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/gallery/gallery1.html'));
});

router.post('/upload_gallery', upload.single('user_image'), auth, function (req, res, next) {
    var user_token = req.cookies.access_token
    var token_decoded = jwt_decode(user_token)
    try {
        Image.create({
            title: req.body.title,
            url: "http://ec2-34-209-136-126.us-west-2.compute.amazonaws.com:5000/images/" + req.file.filename,
            user: token_decoded.username
        });
    } catch (error) {
        console.log(error);
    }
    res.redirect('/gallery');
});

router.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/show.html'));
});

router.post('/upload', upload.single('user_image'), function (req, res, next) {
    var backgroundIndex = req.body.back;
    var upload_image = './images/'+req.file.filename;

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }

    var base64image = base64_encode(upload_image);
    const YoloResult = (callback) => {
        const options = {
            method: 'POST',
            uri: "http://211.215.36.146:8080/api/mask/downloader",
            form: {
                image: base64image,
                imgIndex: backgroundIndex
            }
        }
        //console.log(options)

        request(options, function (err, res, body) {
            callback(undefined, {
                result:body
            });
        });
    }

    function base64_decode(base64str, file) {
        // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
        //var bitmap = new Buffer(base64str, 'base64');
        var bitmap = Buffer.from(base64str.toString("utf-8"), 'base64');
        //var bitmaputf = bitmap.toString("utf-8");
        //console.log(bitmaputf);
        // write buffer to file
        return bitmap
        //fs.writeFileSync(__dirname + '/user_upload/'+file, bitmap);
    }

    YoloResult((err, { result } = {} ) => {
        if(err){
            console.log("error!!!!");
            res.send({
                message: "fail",
                status: "fail"
            });
        }
        let json = JSON.parse(result);
        /*res.send({
            message: 'from flask',
            status: 'success',
            data: {json}
        })*/
        res.sendFile(path.join(__dirname, '../../frontend/pages/show.html'));
        //res.json(base64_decode(json.result));
        //res.sendFile(path.join(__dirname, '../../frontend/pages/show.html'));
    });
});

module.exports = router;