const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const serveIndex = require('serve-index');
const cookieParser = require('cookie-parser');

const auth = require('./backend/middlewares/auth');
const imageUploadRouter = require("./backend/routes/imageUpload");
const User = require('./backend/models/user');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_STRING
const connection_string = process.env.CONNECTION_STRING
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
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use('/images', serveIndex(path.join(__dirname, '/images')));
app.use(express.static(__dirname + '/frontend'));
app.use(express.static(__dirname + '/frontend/css'));
app.use(express.static(__dirname + '/frontend/js'));

app.use(imageUploadRouter);

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/register/register.html'));
});

app.post('/register', async (req, res) => {
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

        const token = jwt.sign(
            { user_id: user._id, username },
            jwt_secret,
            { expiresIn: "15m" }
        );

        user.token = token;
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(user)
    } catch (err) {
        if (err.code === 11000) {
            return res.sendFile(path.join(__dirname, '/frontend/pages/register/register.html'));
        }
        throw err
    }
    return res.sendFile(path.join(__dirname, '/frontend/pages/login/login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/login/login.html'));
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, username },
                jwt_secret,
                { expiresIn: "15m" }
            );

            user.token = token;
            res.cookie('access_token', token, {
                httpOnly: true
            });
            return res.redirect('/');
        }
        res.sendFile(path.join(__dirname, '/frontend/pages/login/login.html'));
    } catch (err) {
        console.log(err);
    }
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery.html'));
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

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/picture-home.html'));
});

app.post('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/show.html'));
});

app.get('/logout', auth, (req, res) => {
    res.clearCookie("access_token");
    return res.redirect("/");
});

app.listen(port,() => console.log(`Server running on port: ${port}`));