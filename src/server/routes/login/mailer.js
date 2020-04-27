const nodemailer = require("nodemailer");

const {
  secrets: {
    sendInBlue: {
      user,
      pass,
    },
  },
} = require('../../../config');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user,
    pass,
  },
});

export default async args => await transporter.sendMail(args);

