var Team = require('../models/team');
var appUser = require('../models/appUser');

exports.teams = function(req, res, next) {
  if(req.user){
    var numbers = [];
    var nicknames = [];
    var teams = req.user.teams;
    if(teams.length > 0){
      teams.forEach(function(team){
        Team.findById(team, function(err, data){
          numbers.push(data.team_number);
          nicknames.push(data.nickname);
          if(numbers.length === teams.length && nicknames.length === teams.length)
          {
            res.render('userTeams', {request: req, teams: teams, numbers: numbers, nicknames: nicknames});
          }
        });
      });
    }else{
      res.render('noTeams', {request: req});
    }
  }else{
    res.render('home/login', {request: req});
  }
}

exports.unsubscribe = function(req, res, next){
  if(req.user){
    var team = req.query.team;
    var updateOptions = { upsert: true, new: true, setDefaultsOnInsert: true };
    var query = { _id: req.user.id };
    var teams = req.user.teams;
    var index = teams.indexOf('frc'+team);
    if (index > -1) {
      teams.splice(index, 1);
    }
    var update = {
      teams: teams
    };
    appUser.findByIdAndUpdate(query, update, updateOptions, function(err, res){
      if (err) return err;
    });
    res.redirect('/teams');
  }
  else{
    res.redirect('/login');
  }
}

exports.teamSearch = function(req, res, next){
  var isnum = /^\d+$/.test(req.query.q);
  if(isnum){
    Team.find({team_number: {$regex : new RegExp(req.query.q, "i")}}, function(err, team){
      res.render('teamSearch', {request: req, teams: team});
    });
  }else{
    Team.find({nickname: {$regex : new RegExp(req.query.q, "i")}}, function(err, team){
      res.render('teamSearch', {request: req, teams: team});
    });
  }

}

exports.subscribe = function(req, res, next){
  if (req.user){
    var team = req.query.team;
    var updateOptions = { upsert: true, new: true, setDefaultsOnInsert: true };
    var query = { _id: req.user.id };
    var teams = req.user.teams;
    var update = true;
    teams.forEach(function(data){
      if(data === 'frc'+team){
        update = false;
      }
    })
    if(update){
      teams.push('frc'+team);
    }
    var update = {
      teams: teams
    };
    appUser.findByIdAndUpdate(query, update, updateOptions, function(err, res){
      if (err) return err;
    });
    res.redirect('/teams/teamSearch?q='+req.query.q);
  }
  else{
    res.redirect('/login');
  }
}
