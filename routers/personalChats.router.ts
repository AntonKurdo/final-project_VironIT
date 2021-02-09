export {};
const PersonalChatsController = require('./../controllers/personalChats.controller');
const {Router} = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const controller = new PersonalChatsController();
const router = Router();

router
  .get('/:id', authMiddleware, controller.getChatsById)
  .post('/', authMiddleware, controller.addNewPersonalChatToUser)
 

module.exports = router; 