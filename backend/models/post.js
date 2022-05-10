const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        title: String,
        /*filename: {
                type: String,
                unique: true,
                required: true
        },
        contentType: {
                type: String,
                required: true
        },
        imageBase64: {
                type: String,
                required: true
        },*/
        poster: {
                type: String,
                required: true
        },
        dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("post", postSchema);