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
    teamList.push(nonKeyTeam);//puts to array
  });
  //puts the time into readable format
  var time = "";
  var currentMilli = msg.message_data.predicted_time;
  var date = new Date(currentMilli*1000);
  // var timeOffset = new Date().getTimezoneOffset() / 60;
  var hours = date.getHours() - 8;
  console.log(timeOffset);
  var seconds = date.getSeconds();
  var minuites = date.getMinutes();
  if(hours>12){
    hours = hours-12;
    time = " pm";
  }else{
    time = " am";
  }
  if(minuites < 10){
     add0Min = "0";
  }else{
      add0Min = "";
  }
  if(seconds < 10){
     add0Sec = "0";
  }else{
      add0Sec = "";
  }
  //adds all the info into the email body
  email += "\nThe event is at " + msg.message_data.event_name+".\nThe event is scheduled for "+hours+":"+add0Min+minuites+":"+add0Sec+seconds+time;
  sendEmails(teamList, email, subject, email);
};

var matchScore = function(msg){
  //sets up all varaibles
  var winningTeam = "";
  var redScore = msg.message_data.match.alliances.red.score;
  var blueScore = msg.message_data.match.alliances.blue.score;
  var textMessage = "The event and match is " +msg.message_data.event_name + " " + msg.message_data.match.match_number + ".\n";
  var email = "The event name is " +msg.message_data.event_name+" and the match number is "+msg.message_data.match.match_number+".\n";
  var subject = "Match Score for Teams ";
  //checks condition for what to say
  if(blueScore > redScore){
    email += "The blue team won with a score of " +blueScore+ " to " +redScore+".\n";
    textMessage += "Blue won. Score of " +blueScore+ " to " + redScore + ".\n";
  }else if(redScore > blueScore){
    email += "The red team won with a score of " +redScore+ " to " +blueScore+".\n";
    textMessage += "Red won. Score of " +redScore+ " to " + blueScore + ".\n";
  }else{
    email += "The teams tied with a score of " +redScore+".\n";
    textMessage += "Tie. Score of " +blueScore+".\n";
  }
  //adds the team numbers to teamList
  var teams = msg.message_data.match.alliances.blue.teams;
  var teamList = [];
  teams.forEach(function(team){
    var nonKeyTeam = team.substring(3);
    subject += nonKeyTeam + ", ";
    teamList.push(nonKeyTeam);
  });
  teams = msg.message_data.match.alliances.red.teams;
  teams.forEach(function(team){
    var nonKeyTeam = team.substring(3);
    subject += nonKeyTeam + ", ";
    teamList.push(nonKeyTeam);
  });
  //prints the teams on the email
  textMessage += "Teams on blue: ";
  email += "The teams on blue alliance are ";
  for(var i=0; i<3; i++){
    if(i<2){
      textMessage += teamList[i] + ", ";
      email += teamList[i] + ", ";
    }else if(i===2){
      textMessage += teamList[i] +".\n";
      email += teamList[i] +".\n";
    }
  }
  textMessage += "Teams on red: ";
  email += "The teams on red alliance are ";
  for(var i=3; i<6; i++){
    if(i<5){
      textMessage += teamList[i] + ", ";
      email += teamList[i] + ", ";
    }else if(i===5){
      textMessage += teamList[i] +".\n";
      email += teamList[i] +".\n";
    }
  }
  sendEmails(teamList, email, subject, textMessage)
};

var sendEmails = function(teamList, email, subject, textMessage){
  var usersSent = [];
  var textsSent = [];
  teamList.forEach(function(team){
    appUser.find({teams: 'frc'+team}, function(err, data){
      data.forEach(function(user){
        var send = true;
        var sendText = true;
        usersSent.forEach(function(sentUsers){
          if(sentUsers === user.email){
            send = false;
          }
        })
        textsSent.forEach(function(sentUsers){
          if(sentUsers === user.email){
            sendText = false;
          }
        })
        if(send && user.notification_settings.email.is_enabled){
          usersSent.push(user.email);
          sender.send(email, subject, user.email);
        }
        if(sendText && user.notification_settings.phone.is_enabled){
          textsSent.push(user.email);
          var carrierEmail;
          if(user.carrier === 'AT&T'){
            carrierEmail = '@mms.att.net';
          }else if(user.carrier === 'T-Mobile'){
            carrierEmail = '@tmomail.net';
          }else if(user.carrier === 'Verison'){
            carrierEmail = '@@vzwpix.com';
          }else if(user.carrier === 'Sprint'){
            carrierEmail = '@pm.sprint.com';
          }
          var number = user.mobile;
          sender.sendText(textMessage, subject, number+carrierEmail);
        }
      })
    });
  });
}
