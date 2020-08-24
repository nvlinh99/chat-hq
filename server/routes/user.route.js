const router = require('express').Router();

const userController = require('../controllers/user.controller');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
