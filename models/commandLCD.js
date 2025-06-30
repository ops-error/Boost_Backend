const mongoose = require('mongoose');

// команды для LCD дисплея

const commandLCDSchema = new mongoose.Schema({
    // owner - id того, кто отправил команду
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    // текст для LCD
    text: {
        type: String,
        required: true,
    },
    // очистить или нет диспл
    clean: {
        type: Boolean,
        required: true,
    },
    // вкл/выкл
    turnOff: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('commandLCD', commandLCDSchema);