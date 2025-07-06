const {createRefreshToken} = require('../controllers/tokens');
const {createDevice} = require('../controllers/devices');
const generateToken = require('./token.service');

// 
async function createUserTokens({ owner, deviceId, deviceName, ipAddress }){
    // создается "карточка" устройства
    const device = createDevice({
        owner, deviceId, deviceName, ipAddress
    });

    // на основе устройства создается долгосрок
    const refreshToken = await createRefreshToken({
        owner, deviceId, ipAddress
    });
    
    // создание краткосрочного токена
    const accessToken = generateToken({ id: owner }, '1h');
    return { refreshToken, accessToken };
}

module.exports = {
    createUserTokens
}