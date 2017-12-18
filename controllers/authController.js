var passport = require('passport');

exports.authenticate = (passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

exports.callback = (passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
  //  console.log(req);
    res.redirect('/');
 });
