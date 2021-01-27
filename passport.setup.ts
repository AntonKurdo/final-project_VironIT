export {}
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('config');
const User = require('./models/user.model');

passport.serializeUser(function(user: any, done: any) {
  done(null, user.id);
});

passport.deserializeUser(function(user: any, done: any) {
  done(null, user)
});

passport.use(new GoogleStrategy({
  clientID: config.get('GOOGLE_CLIENT_ID'),
  clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
  callbackURL: "http://localhost:5000/login/google/callback"
},
async function(accessToken: string, refreshToken: string, profile: any, done: any) {  
      const user = await User.findOne({email: profile._json.email});
      if(user) {
        return done(null, profile); 
      } else {
        return done(null, false)
      }
}
));