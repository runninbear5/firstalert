var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "826465670781-51ktnva0pfdd69h2v5thekp4qn8uv4us.apps.googleusercontent.com",
    clientSecret: "uwtOvjdRxVkq4cXWoU9pBbk8",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, {name: 'wg', id: '123456'});
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
