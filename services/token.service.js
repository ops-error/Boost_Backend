const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = process.env;
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// генерация долгосрока
const generateRefreshToken = async () => {
    // этот для клиента
    const refreshToken = crypto.randomBytes(64).toString('hex');
    // этот для БД
    const heshedToken = await bcrypt.hash(refreshToken, 10);
    return { refreshToken, heshedToken };
}

// создание краткосрочного токена
const generateAccessToken = (params) => {
    return jwt.sign(params, JWT_TOKEN, { expiresIn: '1h' });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}