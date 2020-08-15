const router = require('express').Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Auth route
router.use(authMiddleware.authorize);

module.exports = router;
