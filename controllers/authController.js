var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var config = require('../config.js');

var AppUser = require('../models/appUser');

passport.use(new GoogleStrategy({
    clientID: ""+config.auth.google.clientID,
    clientSecret: ""+config.auth.google.clientSecret,
    callbackURL: ""+config.auth.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var updateOptions = { upsert: true, new: true, setDefaultsOnInsert: true };
    var query = { _id: profile.id };
    var update = {
      _id: profile.id,
      first_name: profile.name.givenName,
      last_name : profile.name.familyName,
      email: profile.emails[0].value,
      verification_status: false,
    };

    AppUser.findByIdAndUpdate(query, update, updateOptions, function(err, res){
      return done(err, res);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  AppUser.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.authenticate = passport.authenticate('google', { scope: ['email'] });

exports.callback = [
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
];
