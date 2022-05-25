const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const jwt_decode = require('jwt-decode');

const auth = require('./backend/nodejs/middlewares/auth');
const imageUploadRouter = require("./backend/nodejs/routes/imageUpload");
const User = require('./backend/nodejs/models/user');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_STRING
const connection_string = process.env.CONNECTION_STRING
const upload = multer();
const app = express();
const port = 5000;

//Connect to MongoDB
mongoose
    .connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => console.log("MongoDB connection established."))
    .catch((err) => console.log(err));

app.use(cors());
//Parsing requests of content-type - application/json
app.use(express.json());
//Parsing requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/frontend', express.static('frontend'));
app.use('/backend', express.static('backend'));

app.use(imageUploadRouter);

app.get('/', (req, res) => {
    fs.readFile(`./frontend/index.html`, (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).send("<h1>500 Error</h1>");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/register/register.html'));
});

app.post('/register', upload.none(), async (req, res) => {
    try{
        const { username, email, password, name, year, month, day, gender, phone_number } = req.body
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: encryptedPassword,
            name,
            year,
            month,
            day,
            gender,
            phone_number
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.sendFile(path.join(__dirname, '/frontend/pages/register/register.html'));
        }
        throw err
    }
    console.log("User registered.");
    return res.sendFile(path.join(__dirname, '/frontend/pages/login/login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/login/login.html'));
});

app.post('/login', upload.none(), async (req, res) => {
    console.log("Attempting login...");
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, username, name: user.name },
                jwt_secret,
                { expiresIn: "10m" }
            );

            user.token = token;
            res.cookie('access_token', token, {
                httpOnly: true
            });
            app.get('/token', function (req, res) {
                var user_token = req.cookies.access_token
                var token_decoded = jwt_decode(user_token)
                res.send(token_decoded);
            });
        }
        return res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery/gallery.html'));
});

app.get('/byeolbichyahaeng', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/program/program-byeolbichyahaeng.html'));
});

app.get('/dalbichgihaeng', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/program/program-dalbichgihaeng.html'));
});

app.get('/jeobgyeonlye', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/program/program-jeobgyeonlye.html'));
});

app.get('/myohyeonlye', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/program/progrma-myohyeonlye.html'));
});

app.get('/saenggwabang', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/program/program-saenggwabang.html'));
});

app.get('/upload_gallery', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery/gallery1.html'));
});

app.get('/upload', function (req, res) {
    res.sendFile(path.join(__dirname, '/frontend/pages/picture-home.html'));
});

app.get('/logout', (req, res) => {
    res.clearCookie("access_token");
    return res.redirect("/");
});

app.listen(port,() => console.log(`Server running on port: ${port}`));