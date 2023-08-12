const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_TRANSPORTER_HOST,
  port: process.env.MAILER_TRANSPORTER_PORT,
  auth: {
    user: process.env.MAILER_TRANSPORTER_USER, //* support@ploteye.com OR admin@ploteye.com
    pass: process.env.MAILER_TRANSPORTER_PASS,
  },
});

// Global mailer
const globalTransporter = nodemailer.createTransport({
  host: process.env.MAILER_TRANSPORTER_HOST,
  port: process.env.MAILER_TRANSPORTER_PORT,
  auth: {
    user: process.env.MAILER_PLOTEYE_GLOBAL_EMAIL, //* support@ploteye.com OR admin@ploteye.com
    pass: process.env.MAILER_PLOTEYE_GLOBAL_PASS,
  },
});

module.exports = emailTransporters = {
  transporter,
  globalTransporter,
};
