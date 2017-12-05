var nodemailer = require('nodemailer');
//creating the email sender
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'dragonchip14@gmail.com',
        pass: 'k0d@Nation57'
    }
});
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
