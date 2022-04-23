const path = require('path');
const express = require('express');
const app = express();
const port = 5000;

const imageUploadRouter = require("./backend/routes/imageUpload")
const usersRouter = require("./backend/routes/users")

app.use(express.static(__dirname + '/frontend'));
app.use(imageUploadRouter);
app.use(usersRouter);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/register.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/gallery.html'));
});

app.get('/notice', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/pages/notice.html'));
});

app.listen(port,() => console.log(`Server running on port: ${port}`));