const UnauthorizedError = require('../errors/unauthorized.err');
const RefreshToken = require('../models/refreshToken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {generateAccessToken} = require('../services/token.service');

// проверка на наличие токенов
module.exports = async (req, res, next) =>{
    const { authorization, firebaseid } = req.headers;
    const refreshToken = req.cookies.refreshToken;

    // если оба токена отсутствуют => ошибка
    if (!firebaseid || !refreshToken) {
        throw new UnauthorizedError('Bad request1');
    }
    // ________________________________________________________
    // если нет access токена, но есть refresh токен

    // поиск данных токена через firebaseid
    const tokenData = await RefreshToken.findOne({ firebaseId: firebaseid });
    const isValidToken = bcrypt.compare(refreshToken.replace('refreshToken=', ''), tokenData.token);
    // если хэш refresh токена не совпадает => ошибка
    if (!isValidToken) {
        throw new UnauthorizedError('Bad request2');
    }
    // если хэш совпадает & наличие firebaseid &
    // наличие refresh токена & наличие access токена
    // => next
    if (isValidToken && firebaseid && refreshToken && authorization.startsWith('Bearer ')) {
        next();
    }

    // если access токена все же нет, то
    // создается новый
    const userData = await User.findOne({ firebaseId: firebaseid });
    let newAccessToken;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        newAccessToken = generateAccessToken({
            userId: userData._id,
            role: userData.role,
        });
        // отныне access токен записывается в headers
        // после авторизации клиент тоже записывает его в localStorage,
        // а оттуда в headers
        req.headers = {
            ...req.headers,
            authorization: `Bearer ${newAccessToken}`
        };
    }
    next();
}