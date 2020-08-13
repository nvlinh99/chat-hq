const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/register', catchErrors(userController.register));
router.post('/login', catchErrors(userController.login));

module.exports = router;