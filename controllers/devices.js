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
    const {firebaseid} = req.headers;

    const isSuccess = deleteDeviceAndToken({firebaseId: firebaseid, userId});
    if (isSuccess) {
        delete req.firebaseid;
        delete req.user;
        delete req.authorization;
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