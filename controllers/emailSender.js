var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config.js');

//creating the email sender
var transporter = nodemailer.createTransport(smtpTransport({
 service: 'gmail',
 auth: {
        user: ''+config.email.email_address,
        pass: ''+config.email.email_password
    }
}));
var mail = function(message, subject, email){
  const mailOptions = {
    from: 'dragonchip14@gmail.com', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message// plain text body
  };
  return mailOptions;
}

exports.send = function(message, subject, email){
  transporter.sendMail(mail(message, subject, email), function (err, info) {
     if(err) console.log(err);
    //   console.log(info);
  });
}
