var sender = require('../emailSender')

exports.tbaNotify = function(req, res){
  var msg = req.body;
  if(msg.message_type === "verification"){
    sender.send(msg.message_data.verification_key);
    console.log("good");
  }
  else if(msg.message_type === "upcoming_match"){
    var email = "The teams are ";
    var teams = msg.message_data.team_keys;
    var teamList = [];
    teams.forEach(function(team){
      email += team + ", ";
      teamList.push(team);
    });
    res.send(teamList);
    var currentMilli = msg.message_data.scheduled_time;
    var seconds =  ((currentMilli/1000) % 60);
    var minuites = ((currentMilli/(1000*60)) % 60);
    var hours =  ((currentMilli/(1000*60*60)) % 12);
    seconds = Math.round(seconds);
    minuites = Math.round(minuites);
    hours = Math.round(hours);
    email += ".\nThe event is at " + msg.message_data.event_name+".\nThe event is scheduled for "+hours+":"+minuites+":"+seconds;
    sender.send(email, "blakelieber@gmail.com");
  }
};
