const Device = require('../models/device');
const RefreshToken = require('../models/refreshToken');
const DuplicateError = require('../errors/duplicate.err');

const { generateRefreshToken, generateAccessToken } = require('./token.service');

// 
async function createUserTokens({ owner, firebaseId, model, role }){
    let device;
    let refreshToken;
    let token;
    try {
        // создается "карточка" устройства
        device = await Device.create({
            firebaseId, model
        });

        token = await generateRefreshToken();
        // на основе устройства создается долгосрок
        refreshToken = await RefreshToken.create({ 
            token: token.heshedToken,
            owner,
            firebaseId,
        });
        if (!device || !refreshToken) {
            throw new Error('gg');
        }
    } catch(error) {
        if (error.code === 11000) {
            throw new DuplicateError('Дубликат чево-та, например этот в user.service');
        }
        throw error;
    }
    // создание краткосрочного токена
    const accessToken = generateAccessToken({
        userId: owner,
        exp: '1h',
        iat: Date.now(),
        role: role,
    });
    return { refreshToken: token.refreshToken, accessToken };
}

module.exports = {
    createUserTokens
}