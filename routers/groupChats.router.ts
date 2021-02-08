export {};
const GroupChatsRouter = require('./../controllers/groupChats.controller');
const {Router} = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const controller = new GroupChatsRouter();
const router = Router();

router
  .get('/:id', authMiddleware, controller.getGroupChatsById)
  .post('/', authMiddleware, controller.addGroupChat)
  .post('/leftChat', authMiddleware, controller.leftChat)

module.exports = router; 