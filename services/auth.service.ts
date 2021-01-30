export {};
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const AuthScheme = require('../validation/auth.scheme');
const LoginScheme = require('../validation/login.scheme');

type AuthBodyT = {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

type CheckingDataT = {
  email: string
}

class AuthService {
  auth = async(body: AuthBodyT) => {
    try{
      const {firstName, lastName, email, password} = body;
      const isValid = await AuthScheme.isValid(body);      
      if(!isValid) {
        return {message: 'Try again... Check your credentials!!!'}
      }
      const candidate = await User.findOne({ email });
      if(candidate) {
        return {message: 'User with this login already exists'}
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({first_name: firstName, last_name: lastName, email, password: hashedPassword});
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
      const isValid = await LoginScheme.isValid(body);      
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
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,        
        userId: user.id,
        avatar: user.avatar,
        'accessToken': accessToken, 
        'refreshToken': refreshToken
      }
    } catch(e) {
      console.log(e.message)
      return {message: 'Something went wrong, try again!'}
    }
  }

  authGoogle = async (data: CheckingDataT) => {
    try {
      const { email } = data;
      const user = await User.findOne({email});
      if(user) {
        const accessToken = jwt.sign({userId: user.id}, config.get('jwtSecret') , {expiresIn: '1h'});
        const refreshToken = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '24h'})
        return {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,  
          avatar: user.avatar,      
          userId: user.id,
          'accessToken': accessToken, 
          'refreshToken': refreshToken
        }
      }
      return {message: 'You are not registred...'}     
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = AuthService;