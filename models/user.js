const { required } = require('joi');
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
        enum: ['admin', 'homie', 'guest'],
        default: 'guest',
    },
    firebaseId: {
        type: [String],
        required: true,
        validate: {
            validator: function(array) {
                return array.length <= 2;
            },
            message: "Можно добавить только 2 устройства"
        }
    }
});

module.exports = mongoose.model('user', userSchema);