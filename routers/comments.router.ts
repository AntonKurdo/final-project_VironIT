export {};
const {Router} = require('express');
const CommentsController = require('../controllers/comments.controller');
const controller = new CommentsController();
const router = Router();
const authMiddleware = require('../middlewares/auth.middleware');

router  
  .get('/:id', authMiddleware, controller.getCommentsByPostId)
  .post('/', authMiddleware, controller.addComment)

module.exports = router;