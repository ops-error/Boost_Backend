const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'device',
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('token', refreshTokenSchema);