const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const imageUploadRouter = require("./backend/routes/imageUpload");
const User = require('./backend/models/user');
const Post = require('./backend/models/post');

const app = express();
const port = 5000;
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_STRING
const connection_string = process.env.CONNECTION_STRING

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
app.use('/images', express.static('images'));

app.use(express.static(__dirname + '/frontend'));
app.use(imageUploadRouter);

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/register/register.html'));
});

/*
app.post('/register', (req, res) => {
    const {
        username,
        email,
        password: plainTextPassword,
        name,
        year,
        month,
        day,
        gender,
        phone_number
    } = req.body
    const password = await bcrypt.hash(plainTextPassword, 7)
    try {
        const response = await User.create({

        })
    }

    var newUser = new User(req.body);

    newUser.save(function (err, user) {
        if (err.code === 11000) return res.json("Username or mail already in use!")
        if (err) res.send(err);
        else return res.sendFile(path.join(__dirname, '/frontend/login/login.html'))
    })
}); */

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/login/login.html'));
});

app.post('/login', async (req, res) => {

    const {username, password} = req.body

    const user = await User.findOne({username, password}).lean()
    if (user) {
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            }, jwt_secret
        )
        return res.json({status: 'ok', token_data: token})
    } else if (!user) {
        return res.json("Invalid username/password.");
    }
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery.html'));
});

app.get('/notice', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/notice.html'));
});

app.post('/createPost', async (req, res) => {
    var newPost = new Post(req.body);
    newPost.save(function (err, post) {
        if (err) console.log(err);
        return res.send("Post saved!")
    })
});

/*
app.post('/createPost', async (req, res) => {
    const {token} = req.body
    try{
        const user = jwt.verify(token, jwt_secret)
        const _id = user.id

        var newPost = new Post(req.body);
        newPost.save(function(err, post) {
            if(err) console.log(err);
            return res.send("Post saved!")
        })
    } catch(err) {
        res.json({ status: 'error', error: 'Invalid token.'})
    }
}); */

app.post('/change-password', async (req, res) => {
    const {token} = req.body
    try{
        const user = jwt.verify(token, jwt_secret)
    } catch(err) {
        res.json({ status: 'error', error: 'Invalid token.'})
    }
});

app.listen(port,() => console.log(`Server running on port: ${port}`));