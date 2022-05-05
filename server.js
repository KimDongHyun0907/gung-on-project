const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//const imageUploadRouter = require("./backend/routes/imageUpload");
const User = require('./backend/models/user');

var corsOption = {
    origin: "http://localhost:5001"
};

const app = express();
const port = 5000;

//Connect to MongoDB
const dbURI = 'mongodb+srv://younghunkim1:gung-on-password@gung-on-account-db.2z0gd.mongodb.net/Gung-on_Account_Database?retryWrites=true&w=majority';
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => console.log("MongoDB connection established."))
    .catch((err) => console.log(err));

app.use(cors(corsOption));
//Parsing requests of content-type - application/json
app.use(express.json());
//Parsing requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));
app.use('/images', express.static('images'));

/*
app.use(
    cookieSession({
        name: 'gung-on-session',
        secret: 'COOKIE_SECRET',
        httpOnly: true
    })
);*/

//app.use(imageUploadRouter);
/*
app.use('/posts', require('./backend/routes/posts'));
require('./backend/routes/auth.routes')(app);
require('./backend/routes/user.routes')(app);*/

/*
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
};*/

app.use(express.static(__dirname + '/frontend'));

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/register/register.html'));
});

app.post('/register', (req, res) => {
    var newUser = new User(req.body);

    newUser.save(function(err, user) {
        if(err) console.log(err);
        return res.send("Success! Registered account.")
    })
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/login/login.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery.html'));
});

app.get('/notice', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/notice.html'));
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/picture-home.html'));
});

app.listen(port,() => console.log(`Server running on port: ${port}`));