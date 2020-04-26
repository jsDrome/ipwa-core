const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    // eslint-disable-next-line no-undef
    user: BUILD_SENDINBLUE_USER,
    // eslint-disable-next-line no-undef
    pass: BUILD_SENDINBLUE_PASS,
  },
});

export default async args => await transporter.sendMail(args);

