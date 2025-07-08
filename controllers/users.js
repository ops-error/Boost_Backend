const bcrypt = require('bcrypt');
const User = require('../models/user');
const {createUserTokens} = require('../services/user.service');
const InvalidAuthError = require ('../errors/invalid-auth.err');

// создание пользователя
// не путать с регистрацией
// тут я власть и я создаю пользователей
const createUser = (req, res, next) => {
    const {
        username, password, firebaseId
    } = req.body;
    bcrypt.hash(password, 10)
    .then((hash) => User.create({
        username, password: hash, firebaseId
    }))
    .then((user) => res.send({
        username: user.username,
        name: user.name,
        userId: user._id,
        firebaseId: user.firebaseId,
    }))
    .catch(next);
}

// авторизация
const loginUser = async (req, res, next) => {
    try {
        const { username, password, firebaseId, model } = req.body;

        if (!username || !password) {
            return next(new InvalidAuthError('Необходимо указать логин и пароль'));
        }

        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return next(new InvalidAuthError('Неверный логин или пароль'));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new InvalidAuthError('Неверный логин или пароль'));
        }

        // Обратите внимание - больше не передаём next
        const tokens = await createUserTokens({
            userId: user._id,
            firebaseId,
            model,
            role: user.role,
        });

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 1000,
            secure: true,
            sameSite: 'strict'
        }).status(200).json({
            access: tokens.accessToken,
            username: user.username,
            userId: user._id,
        });
    } catch (err) {
        if (err instanceof DuplicateError) {
            return next(new InvalidAuthError('Устройство уже зарегистрировано'));
        }
        console.error('Login error:', err);
        next(err);
    }
}

// обновление ника
// вообще хз, пока этот контроллер не развиваю
// у меня там токены-хуёкины плохо работают,
// а тут эта хуня
// const patchName = (req, res, next) => {
//     const {
//         name
//     } = req.body;
//     findByIdAndUpdate(req.user._id, {name}, { returnDocument: 'after' })
//     .orFail()
//     .then((user) => {
//         res.send({user})
//     })
//     .catch(err => next(err));
// }

module.exports = {
    createUser,
    loginUser,
};