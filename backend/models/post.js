const mongoose = require('mongoose');

const postSchema = mongoose.model('Post', new mongoose.Schema({
        title: String,
        content: String,
        poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        dateCreated: {type: Date, default: Date.now}
})
);

module.exports = postSchema;