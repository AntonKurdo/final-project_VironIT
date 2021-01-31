export {};
const PostsController = require('./../controllers/posts.controller');
const {Router} = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const controller = new PostsController();
const router = Router();

router
  .get('/:id', authMiddleware, controller.getAllUserPostsById)  
  .get('/news/:id', controller.getNews)
  .post('/',  authMiddleware, controller.addNewPost)
  .put('/:id',  authMiddleware, controller.likePostById)

module.exports = router; 