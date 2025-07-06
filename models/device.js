const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
    },
    deviceName: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model('device', deviceSchema);