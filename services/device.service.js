const Device = require('../models/device');
const RefreshToken = require('../models/refreshToken');
const User = require('../models/user');

const deleteDeviceAndToken = async ({ firebaseId, userId }) => {
    try{
        Promise.all([
            Device.findOneAndDelete({
                firebaseId: firebaseId,
                userId: userId
            }),
            RefreshToken.findOneAndDelete({
                firebaseId: firebaseId,
                userId: userId
            }),
            // не удаляет из массива.
            // сафонов - исправь
            // еще нужно, чтобы куки удалялись
            // и в res authorization
            // короче, переделай
            User.findByIdAndUpdate(userId, {
                $pull: { firebaseId: firebaseId }
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