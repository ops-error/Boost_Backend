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
    role: {
        type: String,
        required: true,
        enum: ['admin', 'homies', 'guest'],
        default: 'guest',
    }
});

module.exports = mongoose.model('user', userSchema);