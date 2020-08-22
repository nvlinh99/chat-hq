const router = require('express').Router();

const chatRoomController = require('../controllers/chatRoom.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.authorize, chatRoomController.createChatRoom);
router.get('/', authMiddleware.authorize, chatRoomController.getAllChatroom);

module.exports = router;
