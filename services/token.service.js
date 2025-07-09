const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = process.env;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const InvalidDataError = require('../errors/invalid-data.err');
const RefreshToken = require('../models/refreshToken');
const UnauthorizedError = require('../errors/unauthorized.err');

// генерация долгосрока
const generateRefreshToken = async () => {
    // этот для клиента
    const refreshToken = crypto.randomBytes(64).toString('hex');
    // этот для БД
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    console.log('generate token')
    return { refreshToken, hashedToken };
}

// создание краткосрочного токена
const generateAccessToken = ({
    userId,
    role
}) => {
    return jwt.sign({
        userId,
        iat: Date.now(),
        role
    }, JWT_TOKEN, { expiresIn: '1h' });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}