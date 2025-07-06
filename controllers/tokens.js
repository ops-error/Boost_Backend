const RefreshToken = require('../models/refreshToken');
const jwt = require('jsonwebtoken');
const generateToken = require('../services/token.service');

const { JWT_TOKEN } = process.env;

// генерация долгосрока
// и его добавление в бд
async function createRefreshToken ({owner, deviceId, ipAddress}) {
    const token = generateToken({
        id: owner,
        deviceId: deviceId,
        ipAddress: ipAddress
    }, '150d');

    const refreshToken = await RefreshToken.create({ 
        token,
        owner, 
        deviceId, 
        ipAddress
    });

    if (!refreshToken) {
        throw new Error('Что-то пошло не так');
    }
    return refreshToken.token;
}

// обновление краткосрочного токена
const patchAccessToken = (req, res, next) => {
    // надо, чтобы проверялся айпи из рефреш токена
    // и айпи фактический
    // т.е. айпи из токена и айпи, который будет передаваться
    // с запросом
    const { refreshToken } = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token is missing' });
    }

    const payload = jwt.verify(refreshToken, JWT_TOKEN);
    const newAccessToken = generateToken({ id: payload.owner }, '1h');
    RefreshToken.findOne({ owner: payload.owner })
    .orFail(() => {
        throw new Error('Иди наху   й');
    })
    .then(() => {
        res.status(200).send({
            accessToken: newAccessToken,
            expiresIn: 3600
        });
    })
    .catch(next);
}

module.exports = {
    createRefreshToken
}