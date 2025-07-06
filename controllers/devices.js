const Device = require('../models/device');

// создание нового девайса
// почему не через req,res,next?
// потому что самостоятельно он использоваться не будет
// только в цепочке:
// авторизация. клиент => создание девайса => создание рефреш токена => responce клиенту
const createDevice = ({
    owner, deviceId, deviceName, ipAddress
}) => {

    Device.create({
        owner, deviceId, deviceName, ipAddress
    })
    .then((device) => {return device});
}

// а вот это хз зачем я написала
// может потом понадобится, а пока просто болванка
const getDevice = (req, res, next) => {
    const { id } = req.body;

    Device.findOne({ deviceId: id })
    .then((device) => res.send(device))
    .catch(next);
}

module.exports = {
    getDevice,
    createDevice,
}