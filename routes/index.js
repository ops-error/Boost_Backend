// роуты - буквально как знак, который показывает сколько
// до куда-то осталось ехать.
// обычно пишут так: router.get('указатель', мидлвара, дальнейший роут)
// где-то в дальнейшем роуте: router.get('указатель', мидлвара(н-р валидация), контроллер)
const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const commandsRouter = require('./commands');
const authMiddleware = require('../middlewares/auth');

router.use('/', authRouter);
router.use('/user', authMiddleware, usersRouter);
router.use('/commands', authMiddleware, commandsRouter);

module.exports = router;