const HashingService = require('./HashingService');
const { StringGenerator } = require('./stringGenerator');

const { businessConfig } = require('./configs/config');

const generateEmailVerificationCode = async () => {
  const stringGenerator = new StringGenerator(
    businessConfig.emailVerificationCodeLength
  );
  const codeString = await stringGenerator.generate();
  const hashedCode = await HashingService.hash(codeString);

  const validUntil = new Date();
  validUntil.setMinutes(
    validUntil.getMinutes() + businessConfig.emailVerificationCodeValidityTime
  );
  const code = {
    code: hashedCode,
    validUntil: validUntil.toISOString(),
  };
  return { codeString, code };
};

const generatePasswordResetCode = async () => {
  const stringGenerator = new StringGenerator(
    businessConfig.resetPasswordCodeLength
  );
  const codeString = await stringGenerator.generate();
  const hashedCode = await HashingService.hash(codeString);

  const validUntil = new Date();
  validUntil.setMinutes(
    validUntil.getMinutes() + businessConfig.resetPasswordCodeValidityTime
  );
  const code = {
    code: hashedCode,
    validUntil: validUntil.toISOString(),
  };
  return { codeString, code };
};

module.exports = codeGenerator = {
  generateEmailVerificationCode,
  generatePasswordResetCode,
};
