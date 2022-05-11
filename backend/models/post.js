const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        title: String,
        content: String,
        poster: String,
        dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("post", postSchema);