const router = require('express').Router();
const {
    sendCommand
} = require('../controllers/commands');


router.post('/lcd', sendCommand);

module.exports = router;