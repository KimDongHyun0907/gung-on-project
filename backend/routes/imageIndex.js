const express = require("express");
const router = express.Router();
const path = require('path');
const uploadController = require("../controllers/upload");

router.get('/uploadimage', (req, res) => {
        res.sendFile(path.join(__dirname, '../../views/index.html'));
    });

router.post('/uploadimage', uploadController.uploadFiles);

router.get('images', uploadController.getListFiles);

router.get('/images/:name', uploadController.download);

module.exports = router;