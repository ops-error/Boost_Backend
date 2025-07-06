// const {createRefreshToken} = require('../controllers/tokens');S
// const {createDevice} = require('../controllers/devices');
const Device = require('../models/device');
const RefreshToken = require('../models/refreshToken');
const DuplicateError = require('../errors/duplicate.err');

const { generateRefreshToken, generateAccessToken } = require('./token.service');

// 
async function createUserTokens({ owner, deviceId, deviceName, ipAddress }){
    let device;
    let refreshToken;
    try {
        // создается "карточка" устройства
        device = await Device.create({
            owner, deviceId, deviceName, ipAddress
        });

        const token = generateRefreshToken({
            id: owner,
            deviceId: deviceId,
            ipAddress: ipAddress
        });
        // на основе устройства создается долгосрок
        refreshToken = await RefreshToken.create({ 
            token,
            owner, 
            deviceId, 
            ipAddress
        });
        if (!device || !refreshToken) {
            throw new Error('gg');
        }
    } catch(error) {
        if (error.code === 11000) {
            throw new DuplicateError('gg');
        }
        throw error;
    }
    
    // создание краткосрочного токена
    const accessToken = generateAccessToken({ id: owner });
    return { refreshToken: refreshToken.token, accessToken };
}

module.exports = {
    createUserTokens
}