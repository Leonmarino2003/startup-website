const HashingService = require('./HashingService');

/**
 * Compares the input data to a hashed data object using bcrypt.
 * @param {string} inputCode The data to compare.
 * @param {string} code The code to compare against.
 * @returns {Promise<boolean>} A Promise that resolves with a boolean indicating whether the data matches the hashed data.
 */
const validateCode = async (inputCode, code) => {
  return await HashingService.compare(inputCode, code);
};

/**
 * Compares the input data to a hashed data object using bcrypt.
 * @param {string} inputCode The data to compare.
 * @param {{ code: string, validUntil: string }}  code  The code
 * @returns {Promise<boolean>} A Promise that resolves with a boolean indicating whether the data matches the hashed data.
 */
const validateCodeExpiration = async (code) => {
  const validUntil = new Date(code.validUntil);
  const now = new Date();
  return now > validUntil;
};

module.exports = codeValidator = {
  validateCode,
  validateCodeExpiration,
};
