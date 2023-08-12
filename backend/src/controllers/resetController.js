const { userServices } = require('../databaseServices');
const exceptionsManager = require('../globalErrorHandler/exceptionsManager');
const { passGenerator } = require('./../utility/utils');
const codeGenerator = require('../services/codeGenerator');
const { mailer } = require('./../utility/emailservice');
const processPasswordResetCode = require('../services/app/processPasswordResetCode');

const resetController = {};

resetController.createPasswordResetCode = async (req, res, next) => {
  const response = { success: false };
  const email = req.body.email;

  console.log('email: ', email);

  const user = await userServices.findUserByEmail(email);
  if (!user) throw new exceptionsManager.UserNotFound('User not found');

  const resetCode = await codeGenerator.generatePasswordResetCode();
  await userServices.setPasswordResetCode(user, resetCode.code);
  await mailer.passwordResetCodeMailer(email, resetCode.codeString);

  response.success = true;
  response.msg = 'Reset code sent successfully';
  return res.status(200).send(response);
};

resetController.resetPassword = async (req, res, next) => {
  const response = { success: false };
  const email = req.body.email;
  const resetCode = req.body.resetCode;

  if (!email || !resetCode)
    throw new exceptionsManager.BadRequest('Missing required fields');

  const user = await userServices.findUserByEmail(email);
  if (!user) throw new exceptionsManager.UserNotFound('User not found');

  await processPasswordResetCode(resetCode, user);

  const newPassword = await passGenerator();
  await userServices.findAndUpdatePass(user._id, newPassword.hashedPass);

  await mailer.newPasswordWithoutLoginMailer(email, newPassword.unHashedPass);

  response.success = true;
  response.msg = 'Password reset successfully';
  return res.status(200).send(response);
};

module.exports = resetController;
