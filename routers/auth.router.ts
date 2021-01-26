export {};
import { Request, Response} from 'express';
const {Router} = require('express');
const passport = require('passport');
const AuthController = require('../controllers/auth.controller');
const controller = new AuthController();
const router = Router();

interface newRequest extends Request {
  logout: () => void
};

router
  .get('/profile', controller.profile)
  .post('/auth', controller.auth)
  .post('/login', controller.login)
  .get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  .get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req: Request, res: Response) {
    res.redirect('/profile');
  })
  .get('/logout', function(req: newRequest, res: Response){
    req.logout();
    res.redirect('/login');
  });

module.exports = router;