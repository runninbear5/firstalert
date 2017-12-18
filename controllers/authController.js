var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "826465670781-51ktnva0pfdd69h2v5thekp4qn8uv4us.apps.googleusercontent.com",
    clientSecret: "uwtOvjdRxVkq4cXWoU9pBbk8",
    callbackURL: "https://lieberlerts.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
exports.authenticate = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });

exports.callback = (passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
   res.redirect('/');
 });
