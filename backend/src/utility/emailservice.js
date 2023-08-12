const path = require('path');
const {
  supportEmail,
  plotEyeGlobalEmail,
} = require('./emailService/emailTemplates');

async function passwordMailer(userMail, userPassword) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'registration'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
      password: userPassword,
    },
  });
}

async function bannedMailer(userMail, banned) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'banned'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
      banned: banned,
    },
  });
}

async function warnedMailer(userMail) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'warnedMail'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
    },
  });
  console.log('Email sent successfully');
}

async function bidGuideMailer(userMail) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'addedToBidGuide'),
    template: path.join(__dirname, 'emails', 'addedToBidGuide'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
    },
  });
}

async function unSuspensionMailer(userMail) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'unsuspend'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
    },
  });
}

async function suspensionMailer(userMail, suspend) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'suspend'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
      suspend: suspend,
    },
  });
}

async function offeringMail(userMail, offerMessage) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'ownerBidOffer'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
      offerMessage: offerMessage,
    },
  });
}

async function pendingBidDenied(userMail, address) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'pendingBidDenied'),
    message: {
      to: userMail,
    },
    locals: {
      street: address.street,
      city: address.city,
      country: address.country,
    },
  });
}

async function pendingBidAccepted(userMail, address) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'pendingBidAccepted'),
    message: {
      to: userMail,
    },
    locals: {
      street: address.street,
      city: address.city,
      country: address.country,
    },
  });
}

async function newPasswordWithoutLoginMailer(userMail, userPassword) {
  supportEmail.send({
    template: path.join(
      __dirname,
      'emails',
      'password/newPasswordWithoutLogin'
    ),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
      password: userPassword,
    },
  });
}

async function passwordResetCodeMailer(email, codeString) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'password/passwordResetCode'),
    message: {
      to: email,
    },
    locals: {
      name: email,
      codeString: codeString,
    },
  });
}

async function newPasswordResetCodeMailer(email, codeString) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'password/newPasswordResetCode'),
    message: {
      to: email,
    },
    locals: {
      name: email,
      codeString: codeString,
    },
  });
}

async function registrationMailer(userMail, userPassword, uniqueCodeForLink) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'registration'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
      password: userPassword,
      uniqueCodeForLink: uniqueCodeForLink,
    },
  });
}

async function confirmedRegistrationMailer(userMail) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'confirmedRegistration'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
    },
  });
}
async function newEmailVerificationCodeMailer(userMail, emailVerificationCode) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'newEmailVerificationCode'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
      emailVerificationCode: emailVerificationCode,
    },
  });
}

async function bidConformationMailer(userMail, bidObject) {
  console.log(bidObject);
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'bidConformation'),
    message: {
      to: userMail,
    },
    locals: {
      name: userMail,
      amount: bidObject.amount,
      city: bidObject.address.city,
      street: bidObject.address.street,
      country: bidObject.address.country,
    },
  });
}

async function receivedBidMailer(receiver, address, bid) {
  console.log('Sending bid to owner');

  supportEmail.send({
    template: path.join(__dirname, 'emails', 'receivedBid'),
    message: {
      to: receiver.email,
    },
    locals: {
      street: address.street,
      city: address.city,
      country: address.country,
      bidAmount: bid.amount,
      bidTime: bid.messages.time,
      name: receiver.email,
    },
  });
}

// put future mail exports in mailer object and import like { mailer } that way you get all of them in one object
// e.g mailer.passwordMailer()
async function pendingPropertyDenied(userMail, address, reason) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'pendingPropertyDenied'),
    message: {
      to: userMail,
    },
    locals: {
      street: address.street,
      city: address.city,
      country: address.country,
      reason: reason,
    },
  });
}

async function pendingPropertyApproved(userMail, address) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'pendingPropertyApproved'),
    message: {
      to: userMail,
    },
    locals: {
      street: address.street,
      city: address.city,
      country: address.country,
    },
  });
}

async function registerPendingProperty(userMail, address) {
  supportEmail.send({
    template: path.join(__dirname, 'emails', 'registerPlot'),
    message: {
      to: userMail,
    },
    locals: {
      street: address.street,
      city: address.city,
      country: address.country,
    },
  });
}

async function updatePendingBidStatusEmailSender(
  userMail,
  street,
  contactOwnerUpdate,
  newMessage1,
  newMessage2,
  refusalMessageUpdate,
  proce
) {
  supportEmail.send({
    template: path.join(__dirname, 'updatePendingBidStatusEmail'),
    message: {
      to: userMail,
    },
    locals: {
      street,
      city: '',
      country: '',
      contactOwnerUpdate,
      newMessage1,
      newMessage2,
      refusalMessageUpdate,
      processStarted,
    },
  });
}
// import like { mailer } that way you get all of them in one object
// e.g mailer.passwordMailer()
module.exports = {
  mailer: {
    passwordMailer,
    bidConformationMailer,
    registrationMailer,
    confirmedRegistrationMailer,
    pendingPropertyDenied,
    pendingPropertyApproved,
    registerPendingProperty,
    bannedMailer,
    newEmailVerificationCodeMailer,
    newPasswordWithoutLoginMailer,
    passwordResetCodeMailer,
    newPasswordResetCodeMailer,
    pendingBidDenied,
    pendingBidAccepted,
  },
  passwordMailer,
  bidConformationMailer,
  registrationMailer,
  confirmedRegistrationMailer,
  pendingPropertyDenied,
  pendingPropertyApproved,
  registerPendingProperty,
  bannedMailer,
  pendingBidDenied,
  pendingBidAccepted,
  updatePendingBidStatusEmailSender,
  offeringMail,
  suspensionMailer,
  unSuspensionMailer,
  bidGuideMailer,
  warnedMailer,
};
