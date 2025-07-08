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
const generateAccessToken = ({
    userId,
    exp,
    iat,
    role
}) => {
    return jwt.sign({
        userId,
        iat,
        role
    }, JWT_TOKEN, { expiresIn: exp });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}