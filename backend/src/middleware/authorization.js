// This module contains middleware functions for user authorization
// by checking if the user has met certain criteria.

const userServices = require('../databaseServices/userServices');
const exceptionsManager = require('../globalErrorHandler/exceptionsManager');
const userValidation = require('../services/userValidation');

/**
@param {string[]} levels - An array of strings representing the levels of authorization required. E.g. ['standard', 'admin', 'premium']
@param {function} userFinderFunction - A function that returns a user object given an identifier. E.g. userServices.findUserByEmail
@param {function} reqUserIdentifyingKey - A function that returns the identifier for a user given a request object. E.g. req => req.body.email
*/
const authorization = (levels, userFinderFunction, reqUserIdentifyingKey) => {
  return async (req, res, next) => {
    Promise.resolve()
      .then(async () => {
        const userIdentifier = reqUserIdentifyingKey(req);
        if (!userIdentifier)
          return await next(
            new exceptionsManager.BadRequest(
              'No User identifier found in request while authorizing user.'
            )
          );

        const user = await userFinderFunction(userIdentifier);
        await userValidation.validate(levels, user)(req, res, next);
        console.log(`User ${user.email} authorized at levels: ${levels}`);
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};

// Facade functions hide database details from the caller
const authorizationBySpecificId =
  (levels, reqUserIdentifyingKey) => async (req, res, next) =>
    await authorization(
      levels,
      userServices.findUserById,
      reqUserIdentifyingKey
    )(req, res, next);
const authorizationBySpecificEmail =
  (levels, reqUserIdentifyingKey) => async (req, res, next) =>
    await authorization(
      levels,
      userServices.findUserByEmail,
      reqUserIdentifyingKey
    )(req, res, next);

module.exports = authorizer = {
  authorization,
  authorizationBySpecificId,
  authorizationBySpecificEmail,
};
