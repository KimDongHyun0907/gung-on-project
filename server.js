// app.js
const express = require('express');
const multer = require('multer');
const path = require('path');
//const ejs = require('ejs');

//Multer storage
const imageStorage = multer.diskStorage({
    //Directory
    destination: './images/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

//Multer image option
const imageUpload = multer({
    storage: imageStorage,
    //Limit = 10 MB
    limits: {fileSize: 10000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed extentions.
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extention.
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

const app = express();

const port = 5000;

app.set('view engine', 'ejs');

app.use(express.static('./images'));
//app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
//app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
//app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('/', (req, res) => res.render('index'));

//Single image upload
app.post('/upload', (req, res) => {
    imageUpload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: err
            });
        } else {
            if(req.file == undefined){
                res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});