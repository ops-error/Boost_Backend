const bcrypt = require('bcrypt');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const InvalidAuthError = require ('../errors/invalid-auth.err');
const {tokenIssuance} = require('../services/signin.service');
const {COOKIE_SETTINGS} = process.env;

// создание пользователя
// не путать с регистрацией
// тут я власть и я создаю пользователей
const createUser = (req, res, next) => {
    const {
        username, password
    } = req.body;
    bcrypt.hash(password, 10)
    .then((hash) => User.create({
        username, password: hash
    }))
    .then((user) => res.send({
        username: user.username,
        userId: user._id
    }))
    .catch(next);
}

// авторизация
const loginUser = async (req, res, next) => {
    try {
        const { username, password, firebaseId, model } = req.body;

        // наличие юзернейма и пароля
        if (!username || !password) {
            return next(new InvalidAuthError('Необходимо указать логин и пароль'));
        }

        let user = await User.findOne({ username }).select('+password');
        // есть ли такой пользователь в бд по юзернейму
        if (!user) {
            return next(new InvalidAuthError('Неверный логин или пароль2'));
        }
        // совпадает ли пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new InvalidAuthError('Неверный логин или пароль1'));
        }
        
        const tokens = await tokenIssuance({
            devices: user.devices,
            firebaseId,
            userId: user._id,
            model,
            role: user.role
        });

        res.cookie('refreshToken', tokens.refreshToken, COOKIE_SETTINGS)
        .status(200).json({
            access: tokens.accessToken,
            username: user.username,
            userId: user._id,
        });
    } catch (err) {
        next(err);
    }
}

const logoutUser = (req, res, next) => {
    const {firebaseid} = req.headers;
    RefreshToken.findOneAndUpdate({ firebaseId: firebaseid }, {
        isValid: false
    }, { returnDocument: 'after' })
    .then(() =>{
        res.clearCookie('refreshToken', COOKIE_SETTINGS);
        res.status(200).send({
            message: 'Выход из аккаунта успешный'
        })
    })
    .catch(next);
}

module.exports = {
    createUser,
    loginUser,
    logoutUser
};