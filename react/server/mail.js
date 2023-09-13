const nodemailer = require('nodemailer');
var CONFIG = require('./config.json');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.emailUser,
      pass: CONFIG.emailPass
    }
  });

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: CONFIG.emailUser,
        to: CONFIG.emailUser,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    };

module.exports.sendEmail = sendEmail;