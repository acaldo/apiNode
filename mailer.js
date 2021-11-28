const nodemailer = require('nodemailer');
const { config } = require('./config/config');

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: config.smtpGmailAcc,
      pass: config.smtpGmailPass,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'caldart123@gmail.com', // sender address
    to: 'caldart123@gmail.com,nicolasundiano@gmail.com', // list of receivers
    subject: 'Uwitu?', // Subject line
    text: 'Super Uwitu?', // plain text body
    //html: '<b>Hello uwitu?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail();
