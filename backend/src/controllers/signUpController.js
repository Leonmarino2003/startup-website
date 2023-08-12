const { userServices } = require('../databaseServices');

const exceptionsManager = require('../globalErrorHandler/exceptionsManager');

const { passGenerator, userCreatedPassword } = require('./../utility/utils');

const codeGenerator = require('../services/codeGenerator');

const {
  registrationMailer,
  confirmedRegistrationMailer,
} = require('./../utility/emailservice');

const processEmailVerificationCode = require('../services/app/processEmailVerificationCode');

const signUpController = {};
//User signs up with email
signUpController.signUp = async (req, res, next) => {
  const response = {};
  const generatedPassword = await passGenerator();
  
  const existingUser = await userServices.findUserByEmail(req.body.email);
  if (existingUser)
    next(
      new exceptionsManager.AlreadyExists('This email is already registered.')
    );
    //for destructuring the object body which is handled in backendServices
    const { body} = req.body
  //Create user
  const user = {};
  
  // This is a boolean value for handling of user created/generated password
  const isUserCreatedPassword = req.body.isUserCreatedPassword
  user.email = body.email.toLowerCase();
  user.name = body.name.toLowerCase();
  user.address = body.address.toLowerCase();
  user.phoneNumber = body.phoneNumber;
  //This is for handling whether user has chosen a created password or generated one
  if(!isUserCreatedPassword){
    user.password = generatedPassword.hashedPass;
  }else {
    const passwordCreatedByUser = await userCreatedPassword(body.password);
    user.password = passwordCreatedByUser.hashedPass;
  }
  
  user.role = 'normalUser';
  user.codes = {};
  const newUser = await userServices.createUser(user);

  //Generate confirmation code
  const { codeString, code } =
    await codeGenerator.generateEmailVerificationCode(user);
  userServices.setEmailVerificationCode(newUser, code);

  if(!isUserCreatedPassword) registrationMailer(newUser.email, generatedPassword.unHashedPass, codeString);
  else registrationMailer(newUser.email, undefined, codeString)
  response.success = true;
  response.message = 'User has been created.';
  return res.status(201).json(response);
};

//User confirms email
signUpController.confirmSignup = async (req, res, next) => {
  let response = {};
  const email = req.body.email;
  const password = req.body.password;
  const confirmationCode = req.body.confirmationCode;

  if (!email || !password || !confirmationCode)
    throw new exceptionsManager.BadRequest('Missing required fields');

  const authenticatedUser = await userServices.authenticateUser(
    email,
    password
  );
  if (!authenticatedUser)
    throw new exceptionsManager.Unauthorized('Incorrect credentials');

  if (authenticatedUser.verifiedEmail)
    throw new exceptionsManager.UserEmailAlreadyVerified(
      'User email has already been verified'
    );

  // Process code or generate new confirmation code and send it to the user's email.
  await processEmailVerificationCode(confirmationCode, authenticatedUser);
  // You only get here if successful

  // Confirm user email
  const result = await userServices.confirmUserEmail(authenticatedUser);
  if (!result)
    // This should not happen but just in case
    throw new exceptionsManager.InternalServerError(
      'Could not confirm user email due to an internal error'
    );

  confirmedRegistrationMailer(email);

  response.msg = 'User email has been verified';
  response.success = result;
  return res.status(200).send(response);
};

module.exports = signUpController;
