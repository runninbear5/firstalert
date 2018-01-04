exports.home = function(req, res, next) {
  console.log(req.user);
  res.render('home/index', { title: 'Lieberlerts', request: req });
};

exports.login = function(req, res, next)  {
  console.log(req.user);
  res.render('home/login', { title: 'Lieberlerts', request: req});
};

exports.logout = function(req, res, next) {
  req.logout();
  console.log(req.user);
  res.redirect('/');
}

exports.settings = function(req, res, next) {
  res.redirect('/')
}
