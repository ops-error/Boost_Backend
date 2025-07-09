const Device = require('../models/device');
const RefreshToken = require('../models/refreshToken');
const User = require('../models/user');

const deleteDeviceAndToken = async ({ firebaseId, userId }) => {
    try{
        console.log(userId, firebaseId);
        Promise.all([
            Device.findOneAndDelete({
                firebaseId: firebaseId,
                userId: userId
            }),
            RefreshToken.findOneAndDelete({
                firebaseId: firebaseId,
                userId: userId
            }),
            User.findByIdAndUpdate(userId, {
                $pull: { firebaseId }
            })
        ]).then(([d, r, u]) => {
            console.log(d, r, u);
            return true;
        });
    } catch {
        return false;
    }
}

module.exports = {
    deleteDeviceAndToken,
}