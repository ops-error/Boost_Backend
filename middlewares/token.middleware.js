const UnauthorizedError = require('../errors/unauthorized.err');
const RefreshToken = require('../models/refreshToken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {generateAccessToken} = require('../services/token.service');

module.exports = async (req, res, next) =>{
    const { authorization, firebaseId } = req.headers;
    const { refreshToken } = req.cookies;

    if (!firebaseId || !refreshToken) {
        throw new UnauthorizedError('Bad request1');
    }

    if (authorization || authorization.startsWith('Bearer ')) {
        next();
    }

    const tokenData = await RefreshToken.findOne({ firebaseId });
    const isValidToken = bcrypt.compare(refreshToken, tokenData.token);
    if (!isValidToken) {
        throw new UnauthorizedError('Bad request2');
    }
    if (isValidToken && firebaseId && refreshToken && authorization) {
        next();
    }

    const userData = await User.findOne({ firebaseId });
    let newAccessToken;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        newAccessToken = generateAccessToken({
            userId: userData._id,
            role: userData.role,
        });
        req.headers = {
            ...req.headers,
            authorization: `Bearer ${newAccessToken}`
        };
    }
    next();
}