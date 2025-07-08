const RefreshToken = require('../models/refreshToken');
const bcrypt = require('bcrypt');
const { generateRefreshToken, generateAccessToken } = require('../services/token.service');

const { JWT_TOKEN } = process.env;

// генерация долгосрока
// и его добавление в бд
// ________________________________
// пока что не используется
// async function createRefreshToken ({userId, deviceId, ipAddress}) {
//     const token = generateToken({
//         id: userId,
//         deviceId: deviceId,
//         ipAddress: ipAddress
//     }, '150d');

//     const refreshToken = await create({ 
//         token,
//         userId,
//     });

//     if (!refreshToken) {
//         throw new Error('Что-то пошло не так');
//     }
//     return refreshToken.token;
// }

// обновление краткосрочного токена
// const patchAccessToken = (req, res, next) => {
//     const { refreshToken } = req.cookies.refreshToken;

//     if (!refreshToken) {
//         return res.status(401).json({ error: 'Refresh token is missing' });
//     }
//     const heshedToken = hash(refreshToken);

//     findOne({
//         token: heshedToken,
//         expiresAt: { $gt: new Date() }
//     })
//     .orFail(() => {
//         throw new Error('Иди наху   й');
//     })
//     .then(() => {

//         res.status(200).send({
//             accessToken: newAccessToken,
//             expiresIn: 3600
//         });
//     })
//     .catch(next);
// }

module.exports = {
    // createRefreshToken
}