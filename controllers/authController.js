var passport = require('passport');
var config = require('../config.js');
//var mongoose = require('mongoose');
var User = require('../models/user');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: ""+config.auth.google.clientID,
    clientSecret: ""+config.auth.google.clientSecret,
    callbackURL: ""+config.auth.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var updateOptions = { upsert: true, new: true, setDefaultsOnInsert: true };
    var query = { _id: profile.emails[0].value };
    var verified = 'Unverified';
    if(profile._json.verified){
      verified = 'Verified'
    }

    var update = {
      _id: profile.emails[0].value,
      first_name: profile.name.givenName,
      last_name : profile.name.familyName,
      email: profile.emails[0].value,
      verification_status: profile._json.verified
      //teams: []
    };
    User.findByIdAndUpdate(query, update, updateOptions, function(err, res){
      if(err) return;
    //  return done(null, {name: profile.name.givenName, id: profile.emails[0].value});
    });
    return done(null, {name: profile.name.givenName, id: profile.emails[0].value});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
      return done(err, user);
   });
  //return done(null, {name: 'wg', id: '123456'});
});

exports.authenticate = passport.authenticate('google', { scope: ['email'] });

exports.callback = [
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
];
