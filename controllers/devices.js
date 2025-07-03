const Device = require('../models/device');

const createDevice = (req, res, next) => {
    const { name, deviceId } = req.body;

    Device.create({
        deviceId, name
    })
    .then((device) => res.send({
        deviceId: device.deviceId,
        name: device.name,
    }))
    .catch(next);
}

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