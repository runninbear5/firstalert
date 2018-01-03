var Team = require('../models/team');
var appUser = require('../models/appUser');

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

exports.teams = function(req, res, next) {
  // var numbers = teamNumbers(req.user.teams);
  // var nicknames = teamNicknames(req.user.teams);
  if(req.user){
    var numbers = [];
    var nicknames = [];
    var teams = req.user.teams;
    teams.forEach(function(team){
      Team.findById(team, function(err, data){
        numbers.push(data.team_number);
        nicknames.push(data.nickname);
        if(numbers.length === teams.length && nicknames.length === teams.length)
        {
          res.render('home/teams', {request: req, teams: teams, numbers: numbers, nicknames: nicknames});
        }
      });
    });
  }else{
    res.render('home/login', {request: req});
  }
}

exports.unsubscribe = function(req, res, next){
  var team = req.query.team;
  var updateOptions = { upsert: true, new: true, setDefaultsOnInsert: true };
  var query = { _id: req.user.id };
  var teams = req.user.teams;
  var index = teams.indexOf('frc'+team);
  if (index > -1) {
    teams.splice(index, 1);
  }
  console.log(teams);
  var update = {
    teams: teams
  };
  appUser.findByIdAndUpdate(query, update, updateOptions, function(err, res){
    if (err) return err;
  });
  res.redirect('/teams');
}
