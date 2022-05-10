const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const serveIndex = require('serve-index');
const cookieParser = require('cookie-parser');
const http = require('http');

const auth = require('./backend/middlewares/auth');
const imageUploadRouter = require("./backend/routes/imageUpload");
const User = require('./backend/models/user');
const Post = require('./backend/models/post');

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

app.use(imageUploadRouter);

/*const auth = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, config.JWT_SECRET_STRING);
        req.userId = data.id;
        req.userRole = data.role;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};*/

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
            }).status(200).json(user)
            return res.redirect('/');
        }
        res.status(400).send("Invalid credentials.");
    } catch (err) {
        console.log(err);
    }
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery/gallery.html'));
});


app.get('/notice', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/notice/notice.html'));
});

app.get('/createpost', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery/gallery1.html'));
});

app.post('/createpost', auth, (req, res) => {
    const { title, image } = req.body
    const { poster } = req.user
    try{
        var newPost = new Post(req.body);
        newPost.save(function (err, post) {
            if (err) console.log(err);
            return res.send("Post saved!")
        })
    } catch (error) {
        console.log(error);
    };
});

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome!");
});

app.get("/logout", auth, (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
});
/*//Conflicting with auth.js in middlewares
app.use(function(req, res, next) {

    var token = req.cookies.auth;

    // decode token
    if (token) {

        jwt.verify(token, 'secret', function(err, token_data) {
            if (err) {
                return res.status(403).send('Error');
            } else {
                req.user_data = token_data;
                next();
            }
        });

    } else {
        return res.status(403).send('No token');
    }
});*/

app.listen(port,() => console.log(`Server running on port: ${port}`));