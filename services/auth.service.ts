export {};
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const AuthScheme = require('../validation/auth.scheme');

type AuthBodyT = {
  email: string,
  password: string
}

class AuthService {
  auth = async(body: AuthBodyT) => {
    try{
      const {email, password} = body;
      const isValid = await AuthScheme.isValid(body);      
      if(!isValid) {
        return {message: 'Try again... Check your credentials!!!'}
      }
      const candidate = await User.findOne({ email });
      if(candidate) {
        return {message: 'User with this login already exists'}
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({email, password: hashedPassword});
      await user.save();
      return {message: 'User has been created...'}
    } catch(e) {
      console.log(e.message)
      return {message: 'Something went wrong, try again!'}
    }
  } 

  login = async(body: AuthBodyT) => {
    try{
      const {email, password} = body;
      const isValid = await AuthScheme.isValid(body);      
      if(!isValid) {
        return {message: 'Try again... Check your credentials!!!'}
      }
      const user = await User.findOne({ email });
      if(!user) {
        return {message: 'User has not found...'}
      }   
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
        return {message: 'Wrong password, try again...'}
      }      
      const accessToken = jwt.sign({userId: user.id}, config.get('jwtSecret') , {expiresIn: '1h'});
      const refreshToken = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '24h'})
      return {
        'accessToken': accessToken, 
        'refreshToken': refreshToken,
        userId: user.id
      }
    } catch(e) {
      console.log(e.message)
      return {message: 'Something went wrong, try again!'}
    }
  }
}

module.exports = AuthService;