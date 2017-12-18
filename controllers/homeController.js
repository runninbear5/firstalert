exports.home = function(req, res, next) {
  res.render('home/index', { title: 'Express' });
};

exports.login = function(req, res, next)  {
  res.render('home/login', { title: 'Express'});
};
