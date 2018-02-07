var appUser = require('../models/appUser');

exports.home = function(req, res, next) {
  console.log(req.user);
  res.render('home/index', { title: 'Lieberlerts', request: req});
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
  if(req.user){
    appUser.find({email: req.user.email}, function(err, data){
      res.render('home/settings', {request: req, user: data[0]})
    })
  }else{
    res.redirect('/login');
  }

}

exports.saveSettings = function(req, res, next) {
  var getTexts;
  var getEmails;
  if(req.body.text === 'on'){
    getTexts = true;
  }else{
    getTexts = false;
  }
  if(req.body.email === 'on'){
    getEmails = true;
  }else{
    getEmails = false;
  }
  var newNumber = req.body.num;
  var updateOptions = { upsert: true, new: true, setDefaultsOnInsert: true };
  var query = { _id: req.user.id };
  var update = {
    notification_settings: {
      phone: {
        is_enabled: getTexts
      },
      email: {
        is_enabled: getEmails
      }
    },
    mobile: newNumber
  };

  appUser.findByIdAndUpdate(query, update, updateOptions, function(err, doc){
    console.log('saved');
    res.redirect('/settings');
  });
}
