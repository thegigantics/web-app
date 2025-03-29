const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendVerificationEmail = (email, token) => {
  const url = `http://localhost:3000/verify-email?token=${token}`;
  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
  });
};

module.exports = sendVerificationEmail;
