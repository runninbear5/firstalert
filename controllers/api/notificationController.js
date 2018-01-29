var sender = require('../emailSender');
var appUser = require('../../models/appUser');

exports.tbaNotify = function(req, res){
  var msg = req.body;
  if(msg.message_type === "verification"){
    verification(msg);
  }
  else if(msg.message_type === "upcoming_match"){
    upcomingMatch(msg);
  }else if(msg.message_type === "match_score"){
    matchScore(msg);
  }
  res.send("good");
};

var verification = function(msg){
  sender.send(msg.message_data.verification_key, 'Verification', 'blakelieber@gmail.com');
};

var upcomingMatch = function(msg){
  //sets up all varaibles
  var email = "Upcoming Match for ";
  var subject = "Upcoming Match for ";
  var teams = msg.message_data.team_keys;
  var teamList = [];
  //adds all teams
  teams.forEach(function(team){
    var nonKeyTeam = team.substring(3);//gets the team numbers
    subject += nonKeyTeam + ", ";
    email += nonKeyTeam + ", ";
    teamList.push(team);//puts to array
  });
  //puts the time into readable format
  var time = "";
  var currentMilli = msg.message_data.scheduled_time;
  var seconds =  ((currentMilli/1000) % 60);
  var add0Min = "0";
  var add0Sec = "0";
  var minuites = ((currentMilli/(1000*60)) % 60);
  var hours =  ((currentMilli/(1000*60*60)) % 12);
  seconds = Math.round(seconds);
  minuites = Math.round(minuites);
  hours = Math.round(hours);
  if((currentMilli/(1000*60*60)) % 24 > 12){
      time = " am";
  }else{
      time = " pm";
  }
  if(((currentMilli/(1000*60)) % 60) < 10){
     add0Min = "0";
  }else{
      add0Min = "";
  }
  if(((currentMilli/(1000)) % 60) < 10){
     add0Sec = "0";
  }else{
      add0Sec = "";
  }
  //adds all the info into the email body
  email += "\nThe event is at " + msg.message_data.event_name+".\nThe event is scheduled for "+hours+":"+add0Min+minuites+":"+add0Sec+seconds+time;
  sendEmails(teamList, email, subject)
};

var matchScore = function(msg){
  //sets up all varaibles
  var winningTeam = "";
  var redScore = msg.message_data.match.alliances.red.score;
  var blueScore = msg.message_data.match.alliances.blue.score;
  var email = "The event name is " +msg.message_data.event_name+" and the match number is "+msg.message_data.match.match_number+".\n";
  var subject = "Match Score for Teams ";
  //checks condition for what to say
  if(blueScore > redScore){
    email += "The blue team won with a score of " +blueScore+ " to " +redScore+".\n";
  }else if(redScore > blueScore){
    email += "The red team won with a score of " +redScore+ " to " +blueScore+".\n";
  }else{
    email += "The teams tied with a score of " +redScore+".\n";
  }
  //adds the team numbers to teamList
  var teams = msg.message_data.match.alliances.blue.teams;
  var teamList = [];
  teams.forEach(function(team){
    var nonKeyTeam = team.substring(3);
    subject += nonKeyTeam + ", ";
    teamList.push(team);
  });
  teams = msg.message_data.match.alliances.red.teams;
  teams.forEach(function(team){
    var nonKeyTeam = team.substring(3);
    subject += nonKeyTeam + ", ";
    teamList.push(nonKeyTeam);
  });
  //prints the teams on the email
  email += "The teams on blue alliance are ";
  for(var i=0; i<3; i++){
    if(i<2){
      email += teamList[i] + ", ";
    }else if(i===2){
      email += teamList[i] +".\n";
    }
  }
  email += "The teams on red alliance are ";
  for(var i=3; i<6; i++){
    if(i<5){
      email += teamList[i] + ", ";
    }else if(i===5){
      email += teamList[i] +".\n";
    }
  }
  sendEmails(teamList, email, subject)
};

var sendEmails = function(teamList, email, subject){
  var usersSent = [];
  teamList.forEach(function(team){
    appUser.find({teams: team}, function(err, data){
      data.forEach(function(user){
        var send = true;
        usersSent.forEach(function(sentUsers){
          if(sentUsers === user.email){
            send = false;
          }
        })
        if(send && user.notification_settings.email.is_enabled){
          usersSent.push(user.email);
          sender.send(email, subject, user.email);
        }
      })
    });
  });
}
