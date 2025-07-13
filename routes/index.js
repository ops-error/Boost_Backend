// роуты - буквально как знак, который показывает сколько
// до куда-то осталось ехать.
// обычно пишут так: router.get('указатель', мидлвара, дальнейший роут)
// где-то в дальнейшем роуте: router.get('указатель', мидлвара(н-р валидация), контроллер)
const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const commandsRouter = require('./commands');
const tokenMiddleware = require('../middlewares/token.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const {
    deleteDevice
} = require('../controllers/devices');

router.use('/', authRouter);
router.use('/user', tokenMiddleware, authMiddleware, usersRouter);
router.use('/commands', tokenMiddleware, authMiddleware, commandsRouter);
router.delete('/deleteDevice', tokenMiddleware, authMiddleware, deleteDevice);

module.exports = router;