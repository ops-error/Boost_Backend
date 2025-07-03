const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('device', deviceSchema);