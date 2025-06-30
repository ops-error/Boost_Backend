// роуты - буквально как знак, который показывает сколько
// до куда-то осталось ехать.
// обычно пишут так: router.get('указатель', мидлвара, дальнейший роут)
// где-то в дальнейшем роуте: router.get('указатель', мидлвара(н-р валидация), контроллер)
const router = require('express').Router();
const {
    createUser,
    loginUser,
    patchName
} = require('../controllers/users');
const {
    sendCommand
} = require('../controllers/commands');

router.post('/signin', loginUser);
router.post('/signup', createUser);
router.patch('/user/name', patchName);

router.post('/lcd/command', sendCommand);

module.exports = router;