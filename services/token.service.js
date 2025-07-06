const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = process.env;

// генерация долгосрока
const generateRefreshToken = (params) => {
    return jwt.sign(params, JWT_TOKEN, { expiresIn: '30d' });
}

// создание краткосрочного токена
const generateAccessToken = (params) => {
    return jwt.sign(params, JWT_TOKEN, { expiresIn: '1h' });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}