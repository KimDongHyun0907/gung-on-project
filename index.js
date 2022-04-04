var express = require('express');
var multer  = require('multer');
var path = require('path');
var app = express();
var port = 5000;

var storage = multer.diskStorage({
    destination: './images/', //Directory of where images are stored.
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits: {fileSize: 10000000}, //File size limit 10 MB.
    fileFilter: function (req, file, cb) { //PNG, JPG, JPEG
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Invalid file format!'));
        }
    }
});

app.use(express.static(__dirname + '/public'));
app.use('/images', express.static('images'));

//URL change to /upload once image is successfully uploaded.
app.post('/upload', upload.single('user_image'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "File uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
});

app.listen(port,() => console.log(`Server running on port: ${port}`));