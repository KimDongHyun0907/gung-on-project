// app.js
const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express();

//multer option
const upload = multer({
    //dest: 'images',
    limits: {fileSize: 10000000},
    image: {type: Buffer},
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        } cb (undefined, true)
    }
})

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'))
});


app.listen(5000, () => {
    console.log('Listening on port ' + 5000);
});