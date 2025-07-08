const Device = require('../models/device');
const RefreshToken = require('../models/refreshToken');
const DuplicateError = require('../errors/duplicate.err');

const { generateRefreshToken, generateAccessToken } = require('./token.service');

// 
const createUserTokens = async ({ userId, firebaseId, model, role }) => {
    try {
        // создается "карточка" устройства
        const device = await Device.create({
            firebaseId, 
            model
        });

        const token = await generateRefreshToken();
        
        // на основе устройства создается refresh token
        const refreshToken = await RefreshToken.create({ 
            token: token.hashedToken, // исправлено heshed -> hashed
            userId,
            firebaseId,
        });

        const accessToken = generateAccessToken({
            userId,
            exp: '1h',
            iat: Date.now(),
            role: role,
        });

        return { 
            refreshToken: token.refreshToken, 
            accessToken 
        };
    } catch(error) {
        console.error('Token creation error:', error);
        if (error.code === 11000) {
            throw new DuplicateError('Устройство с таким firebaseId уже существует');
        }
        throw error; // пробрасываем ошибку дальше
    }
}

module.exports = {
    createUserTokens
}