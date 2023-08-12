const codeGenerator = require('../codeGenerator');
const codeValidator = require('../codeValidator');
const exceptionsManager = require('../../globalErrorHandler/exceptionsManager');
const userServices = require('../../databaseServices/userServices');
const { mailer } = require('../../utility/emailservice');

module.exports = processPasswordResetCode = async (resetCode, user) => {
  if (!user.codes) user.codes = {};
  if (!user.codes.passwordResetCode) {
    newResetCode(user);
    throw new exceptionsManager.MissingCodeCreated(
      "No reset code found on user. A new one has been sent to the user's email."
    );
  }

  const validCode = await codeValidator.validateCode(
    resetCode,
    user.codes.passwordResetCode.code
  );
  if (!validCode)
    throw new exceptionsManager.BadRequest('Invalid confirmation code');

  const expiredCode = await codeValidator.validateCodeExpiration(
    user.codes.passwordResetCode
  );
  if (expiredCode) {
    newResetCode(user);
    throw new exceptionsManager.ExpiredCode(
      "Reset code has expired. A new one has been sent to the user's email."
    );
  }
  return;
};

const newResetCode = async (user) => {
  const { codeString, code } =
    await codeGenerator.generateEmailVerificationCode();

  userServices.setPasswordResetCode(user, code);
  await mailer.newPasswordResetCodeMailer(user.email, codeString);
};
