var express = require('express');
var router = express.Router();

var controller = require('../controllers/authController');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "826465670781-51ktnva0pfdd69h2v5thekp4qn8uv4us.apps.googleusercontent.com",
    clientSecret: "uwtOvjdRxVkq4cXWoU9pBbk8",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("hello");
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(err, {user:"Blake"});
  }
));

router.get('/google', controller.authenticate);

router.get('/google/callback', controller.callback);

module.exports = router;
