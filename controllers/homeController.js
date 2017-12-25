exports.home = function(req, res, next) {
  console.log(req.user);
  res.render('home/index', { title: 'Express', request: req });
};

exports.login = function(req, res, next)  {
  console.log(req.user);
  res.render('home/login', { title: 'Express', request: req});
};
