'use strict'

import passport from 'passport';
import googleStrategy from './google/google-strategy.js';
import facebookStrategy from './facebook/facebook-strategy.js';
import localLogInStrategy from './local/local-log-in-strategy.js';
import localRegisterStrategy from './local/local-register-strategy.js';

//auth strategies
passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use('local-login', localLogInStrategy);
passport.use('local-register', localRegisterStrategy);

//serialising and deserialising user objects
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
