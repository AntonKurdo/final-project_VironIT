export {};
const {Router} = require('express');



const AuthController = require('../controllers/auth.controller')

const controller = new AuthController();

const router = Router();

router
  .post('/auth', controller.auth)
  .post('/login', controller.login)

module.exports = router;