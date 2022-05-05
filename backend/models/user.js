const mongoose = require("mongoose");

const userSchema = mongoose.model("User", new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        name: String,
        year: Number,
        month: Number,
        day: Number,
        gender: String,
        phone_number: String,
        dateCreated: {type: Date, default: Date.now},
    })
);

module.exports = userSchema;