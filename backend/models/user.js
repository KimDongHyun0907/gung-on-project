const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username: { type: String, unique: true },
        email: { type: String, unique: true },
        password: String,
        name: String,
        year: Number,
        month: Number,
        day: Number,
        gender: String,
        phone_number: { type: String, unique: true },
        dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);