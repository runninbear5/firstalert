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
var mail = function(message, email){
  const mailOptions = {
    from: 'dragonchip14@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Subject of your email', // Subject line
    text: message// plain text body
  };
  return mailOptions;
}

exports.send = function(message, email){
  transporter.sendMail(mail(message, email), function (err, info) {
     if(err) console.log(err);
    //   console.log(info);
  });
}
