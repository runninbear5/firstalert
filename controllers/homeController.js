<<<<<<< HEAD

exports.home = function(req, res, next) {
    res.render('home/index', { title: 'Express' });
};

exports.login = function(req, res, next) {
    res.render('home/login', { title: 'Login' });
};
=======
exports.home = function(req, res, next) {
  res.render('home/index', { title: 'Express' });
};

exports.login = function(req, res, next)  {
  res.render('home/login', { title: 'Express'});
};
>>>>>>> b8dce8468b36ceb49d83012c62a37e3b83eb1d77
