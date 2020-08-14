const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;