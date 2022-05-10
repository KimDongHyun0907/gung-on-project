const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const http = require('http');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_STRING

const auth = require('../middlewares/auth');
const User = require('../models/user');

const router = express.Router();

router.use(cors());
//Parsing requests of content-type - application/json
router.use(express.json());
//Parsing requests of content-type - application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true}));
router.use(cookieParser());

router.use(express.static(__dirname + '/frontend'));

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/register/register.html'));
});

router.post('/register', async (req, res) => {
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
            return res.sendFile(path.join(__dirname, '../../frontend/pages/register/register.html'));
        }
        throw err
    }
    return res.sendFile(path.join(__dirname, '../../frontend/pages/login/login.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/pages/login/login.html'));
});

router.post('/login', async (req, res) => {
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

router.get("/logout", auth, (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
});

module.exports = router;