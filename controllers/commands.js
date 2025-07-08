// контроллеры напрямую взаимодействует с бд
// тут производятся все манипуляции: добавление в бд, удаление из бд
// обновить инфу в бд, get запрос из бд
const CommandLCD = require('../models/commandLCD');

const sendCommand = (req, res, next) => {
    const { text, clean, turnOff } = req.body;
    const userId = req.user._id;

    create({
        userId, text, clean, turnOff
    })
    .then((comm) => res.send({
        userId: comm.userId,
        text: comm.text,
        clean: comm.clean,
        turnOff: comm.turnOff,
    }))
    .catch(next);
};

module.exports = {
    sendCommand,
};