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
    var verified = 'Unverified';
    if(profile._json.verified){
      verified = 'Verified'
    }
      var user = {
        _id: profile.id,
        first_name: profile.name.givenName,
        last_name : profile.name.familyName,
        email: profile.emails[0].value,
        verification_status: verified
        //teams: []
      };
      console.log(user);
      User.findByIdAndUpdate({_id: profile.id}, user, updateOptions, function(err, res){
        if(err) return;
        return done(null, {name: profile.name.givenName, id: profile.id});
      });
    //return done(null, {name: profile.name.givenName, id: profile.id});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  return done(null, {name: 'wg', id: '123456'});
});

exports.authenticate = passport.authenticate('google', { scope: ['email'] });

exports.callback = [
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
];
