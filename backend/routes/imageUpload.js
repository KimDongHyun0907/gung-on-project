const multer  = require('multer');
const express = require('express');
const path = require('path');
const request = require('request');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const fs = require('fs');
require('dotenv').config();

const auth = require('../middlewares/auth.js');
const Image = require('../models/image');

const router = express.Router();
const jwt_secret = process.env.JWT_SECRET_STRING

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use('/frontend', express.static('frontend'));

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
        const token = jwt.sign(
            {
                user_id: token_decoded.user_id,
                username: token_decoded.username
            },
            jwt_secret,
            { expiresIn: "10m" }
        );
        res.cookie('access_token', token, {
            httpOnly: true
        });
    } catch (error) {
        console.log(error);
    }
    res.redirect('/gallery');
});


router.get('/upload', function (req, res) {
    res.sendFile(path.join(__dirname, '../../frontend/pages/picture-home.html'));
});

router.post('/upload', upload.single('user_image'), function (req, res, next) {
    console.log("upload");
    var backgroundIndex = req.body.back;
    var img_corner = req.body.corner;
    var img_pos = req.body.pos;
    var img_size = req.body.size;
    var upload_image = './images/'+req.file.filename;
    var time = Date.now()

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
                imgIndex: backgroundIndex,
                corner: img_corner,
                pos: img_pos,
                size: img_size
            }
        }

        request(options, function (err, res, body) {
            callback(undefined, {
                result:body
            });
        });
    }

    function base64_decode(base64str, file) {
        var bitmap = Buffer.from(base64str.toString("utf-8"), 'base64');
        fs.writeFileSync(__dirname + '/user_upload/' + 'userupload' + '_' + time +  '.jpg', bitmap);
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
        base64_decode(json.result)
        router.get('/imgs', function (req, res) {
            fs.readFile('./backend/routes/user_upload/userupload'+time+'.jpg', function (error, data) {
                res.writeHead(200,{"Content-Type": "image/jpg"});
                res.write(data);
                res.end();
            });
        });

        res.sendFile(path.join(__dirname, '../../frontend/pages/show.html'));
    });
});

module.exports = router;