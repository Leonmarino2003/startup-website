const codeGenerator = require('../codeGenerator');
const codeValidator = require('../codeValidator');
const exceptionsManager = require('../../globalErrorHandler/exceptionsManager');
const userServices = require('../../databaseServices/userServices');
const { mailer } = require('../../utility/emailservice');

module.exports = processEmailVerificationCode = async (
  verificationCode,
  user
) => {
  if (!user.codes) user.codes = {};
  if (!user.codes.emailVerificationCode) {
    processNewVerificationCode(user);
    throw new exceptionsManager.BadRequest(
      "No confirmation code found. A new one has been sent to the user's email."
    );
  }

  const validCode = await codeValidator.validateCode(
    verificationCode,
    user.codes.emailVerificationCode.code
  );
  if (!validCode)
    throw new exceptionsManager.BadRequest('Invalid confirmation code');

  const expiredCode = await codeValidator.validateCodeExpiration(
    user.codes.emailVerificationCode
  );
  if (expiredCode) {
    processNewVerificationCode(user);
    throw new exceptionsManager.BadRequest(
      "Confirmation code has expired. A new one has been sent to the user's email."
    );
  }
  return;
};

const processNewVerificationCode = async (user) => {
  const { codeString, code } =
    await codeGenerator.generateEmailVerificationCode(user);
  userServices.setEmailVerificationCode(user, code);
  await mailer.newEmailVerificationCodeMailer(user.email, codeString);
};
