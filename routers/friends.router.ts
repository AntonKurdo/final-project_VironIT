export {};
const {Router} = require('express');
const FriendsController = require('../controllers/friends.controller');
const controller = new FriendsController();
const router = Router();
const authMiddleware = require('../middlewares/auth.middleware');

router  
  .get('/allUsers', authMiddleware, controller.getAllUsers)
  .get('/allFriends/:id', authMiddleware, controller.getAllFriendsByUserId)
  .put('/addFriend', authMiddleware, controller.addFriend)
  .put('/removeFriend', authMiddleware, controller.removeFriend)

module.exports = router;