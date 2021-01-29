export {};
const PostsController = require('./../controllers/posts.controller');
const {Router} = require('express');


const controller = new PostsController();
const router = Router();

router
  .get('/:id', controller.getAllUserPostsById)  
  .post('/', controller.addNewPost)
  .put('/:id', controller.likePostById)

module.exports = router; 