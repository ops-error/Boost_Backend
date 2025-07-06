const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {NODE_ENV, JWT_TOKEN} = process.env;
const {createUserTokens} = require('../services/user.service');
const InvalidAuthError = require('../errors/invalid-auth.err');

// создание пользователя
// не путать с регистрацией
// тут я власть и я создаю пользователей
const createUser = (req, res, next) => {
    const {
        username, password, name
    } = req.body;
    bcrypt.hash(password, 10)
    .then((hash) => User.create({
        username, name, password: hash,
    }))
    .then((user) => res.send({
        username: user.username,
        name: user.name,
        _id: user._id,
    }))
    .catch(next);
}

// авторизация
async function loginUser (req, res, next) {
    const {
        username, password, deviceId, deviceName, ipAddress
    } = req.body;
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
        throw new InvalidAuthError('Неверный логин или пароль');
    }

    if (bcrypt.compare(password, user.password)) {
        const tokens = await createUserTokens({
            owner: user._id,
            deviceId,
            deviceName,
            ipAddress
        });
        if (!tokens) {
            throw new Error('иди нахуй корочк');
        }
        res.status(200).send({
            access: tokens.accessToken,
            refresh: tokens.refreshToken,
            expiresIn: 3600
        });
    }
}

// обновление ника
// вообще хз, пока этот контроллер не развиваю
// у меня там токены-хуёкины плохо работают,
// а тут эта хуня
const patchName = (req, res, next) => {
    const {
        name
    } = req.body;
    User.findByIdAndUpdate(req.user._id, {name}, { returnDocument: 'after' })
    .orFail()
    .then((user) => {
        res.send({user})
    })
    .catch(err => next(err));
}

module.exports = {
    createUser,
    loginUser,
    patchName
};