export {};
const {Router} = require('express');
const AuthController = require('../controllers/auth.controller');
const controller = new AuthController();
const router = Router();

router  
  .post('/auth', controller.auth)
  .post('/login', controller.login)
  .post('/auth/google', controller.authGoogle)


module.exports = router;