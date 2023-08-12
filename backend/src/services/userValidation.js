const exceptionsManager = require('../globalErrorHandler/exceptionsManager');

const validate = (levels, user) => {
  return async (req, res, next) => {
    for (const level of levels) {
      console.log(`Validating user ${user.email} at level ${level}`);
      switch (level) {
        case 'standard':
          await standardValidation(user);
          break;
        default:
          throw new Error(`Invalid validation level: ${level}`);
      }
    }
  };
};

// Validation  level groups
const standardValidation = async (user) => {
  await validateVerifiedEmail(user);
  await validateVerifiedPhoneNumber(user);
};

// Validate specific criteria
const validateVerifiedEmail = async (user) => {
  console.log(`Validating user ${user.email} has verified email`);
  if (!user.verifiedEmail)
    throw new exceptionsManager.Unauthorized('User email not verified.');
};

const validateVerifiedPhoneNumber = async (user) => {};

module.exports = userValidation = {
  validate,
};
