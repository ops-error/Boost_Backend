const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 21,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        required: false,
    },
    // deviceId: {
    //     type: String,
    //     required: true,
    // },
    // token: {
    //     type: String,
    //     required: true,
    // }
});

module.exports = mongoose.model('user', userSchema);