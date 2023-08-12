const Email = require('email-templates');
const transporters = require('./emailTransporters');
require('dotenv').config();

const plotEyeGlobalEmail = new Email({
  message: {
    from: process.env.MAILER_PLOTEYE_GLOBAL_EMAIL,
  },
  transport: transporters.transporter,
  send: true,
  preview: false,
});

const supportEmail = new Email({
  message: {
    from: process.env.MAILER_SUPPORT_EMAIL,
  },
  transport: transporters.transporter,
  send: true,
  preview: false,
});

module.exports = {
  plotEyeGlobalEmail,
  supportEmail,
};
