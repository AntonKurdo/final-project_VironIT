export {};
const ArchivedChatsController = require('./../controllers/archivedChats.controller');
const {Router} = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const controller = new ArchivedChatsController();
const router = Router();

router
  .get('/:id', authMiddleware, controller.getArchivedChatsById)
  .post('/archive', authMiddleware, controller.archiveChat)
  .post('/unarchive', authMiddleware, controller.unarchiveChat) 

module.exports = router; 