const Device = require('../models/device');
const {deleteDeviceAndToken} = require('../services/device.service');
const InvalidDataError = require('../errors/invalid-data.err');

const createDevice = ({
    model, firebaseId, userId
}) => {

    Device.create({
        model, firebaseId, userId
    })
    .then((device) => {return device});
}

const deleteDevice = async (req, res, next) => {
    const {userId} = req.user;
    const {firebaseId} = req.headers;

    const isSuccess = deleteDeviceAndToken({firebaseId, userId});
    if (isSuccess) {
        res.status(200).send('Всё получилось');
    } else {
        next(new InvalidDataError('Very Bad request'))
    }
}

module.exports = {
    // getDevice,
    createDevice,
    deleteDevice
}