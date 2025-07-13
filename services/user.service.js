const Device = require('../models/device');
const RefreshToken = require('../models/refreshToken');
const DuplicateError = require('../errors/duplicate.err');

const { generateRefreshToken, generateAccessToken } = require('./token.service');

const createUserTokens = async ({ userId, firebaseId, model, role }) => {
    try {
        // создается "карточка" устройства
        const device = await Device.create({
            firebaseId, 
            model,
            userId
        });

        const token = await generateRefreshToken();
        
        // на основе устройства создается refresh token
        const refreshToken = await RefreshToken.create({ 
            token: token.hashedToken, // исправлено heshed -> hashed
            userId,
            firebaseId,
            isValid: true
        });

        const accessToken = generateAccessToken({
            userId,
            role: role,
        });

        return { 
            refreshToken: token.refreshToken, 
            accessToken 
        };
    } catch(error) {
        throw error; // пробрасываем ошибку дальше
    }
}

module.exports = {
    createUserTokens
}