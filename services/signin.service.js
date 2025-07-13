const InvalidAuthError = require('../errors/invalid-auth.err');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const {createUserTokens} = require('./user.service');
const {
    generateAccessToken, generateRefreshToken
} = require('./token.service');

// выдача токенов в зависимости от firebaseId
const tokenIssuance = async ({
    devices, firebaseId, userId, model, role
}) => {
    // если такого девайса еще нет у юзера
    if (!devices.includes(firebaseId)) {
        // если количество девайсов больше 2, то ошибка
        if (devices.length >= 2) {
            throw new InvalidAuthError('Превышено количество зарегестрированных устройств');
        }
        // в ином случае обновляется массив девайсов
        await User.findOneAndUpdate({ _id: userId }, {
            $addToSet: {
                devices: firebaseId
            }
        });
        // создается новый рефреш токен и новый девайс в бд
        return await createUserTokens({
            userId,
            firebaseId,
            model,
            role
        });
    } else {
        // если такой firebaseId существует, то проверяет
        // валидность токена для этого девайса
        // если токен валидный, то выдает ошибку
        // если токен не валидный, то выдается новый токен
        const token = await RefreshToken.findOne({firebaseId: firebaseId});
        if (token.isValid === true) {
            throw new InvalidAuthError('Такое устройство уже существует')
        }
        await RefreshToken.findOneAndUpdate({firebaseId: firebaseId}, {
            isValid: true
        });
        return {
            accessToken: generateAccessToken({
                userId,
                role
            }),
            refreshToken: await generateRefreshToken()
        };
    }
}

module.exports = {
    tokenIssuance
}