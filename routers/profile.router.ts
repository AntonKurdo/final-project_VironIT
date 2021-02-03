export {};
const ProfileController = require('./../controllers/profile.controller');
const {Router} = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const controller = new ProfileController();
const router = Router();

router
  .put('/', authMiddleware, controller.changeAvatar)

module.exports = router; 