// мидлвары используются как промежуточная проверка
// перед тем, как "дотронуться" до бд
// обычно это проверки jwt/cookie, валидация входящих данных

const users = require('../utils');
const checkUser = (userId, res) => {
    if (!users[userId]) {
        res.send('Тут таких нет, уходи');
        return;
    }
    next();
}

module.exports = checkUser;