const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    firebaseId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('device', deviceSchema);