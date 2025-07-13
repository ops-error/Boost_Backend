const RefreshToken = require('../models/refreshToken');
const bcrypt = require('bcrypt');
const { generateRefreshToken, generateAccessToken } = require('../services/token.service');

// обновление краткосрочного токена
const patchAccessToken = (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token is missing' });
    }
    const heshedToken = hash(refreshToken);

    findOne({
        token: heshedToken,
        expiresAt: { $gt: new Date() }
    })
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
    // createRefreshToken
}