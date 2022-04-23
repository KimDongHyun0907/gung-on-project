const path = require('path');
const express = require('express');
/*const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi);*/
const mongoose = require('mongoose');

const imageUploadRouter = require("./backend/routes/imageUpload")
const usersRouter = require("./backend/routes/users")

const app = express();
const port = 5000;

//Connect to MongoDB
const dbURI = 'mongodb+srv://younghunkim1:gung-on-password@gung-on-account-db.2z0gd.mongodb.net/Gung-on_Account_Database?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then((result) => console.log("MongoDB connection established."))
    .catch((err) => console.log(err));

app.use(express.static(__dirname + '/frontend'));
app.use(express.json());
app.use(usersRouter);
app.use(imageUploadRouter);

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery.html'));
});

app.get('/notice', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/notice.html'));
});

app.listen(port,() => console.log(`Server running on port: ${port}`));