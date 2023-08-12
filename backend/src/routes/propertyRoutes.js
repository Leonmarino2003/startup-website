const express = require('express');
const propertyRouter = express.Router();
const { propertyController } = require('./../controllers');
const catchAsync = require('../globalErrorHandler/catchAsync');
const authorizer = require('../middleware/authorization');
const userServices = require('../databaseServices/userServices');
const { isAdmin } = require('../middleware/rolesCheck');

propertyRouter.post(
  '/admin/registerPropertyOwner',
  isAdmin,
  authorizer.authorization(
    ['standard'],
    userServices.findUserById,
    (req) => req.body.userId
  ),
  catchAsync(propertyController.registerPropertyOwner)
);

propertyRouter.get(
  '/getFavoriteProperties/:user',
  catchAsync(propertyController.getFavoriteProperties)
);

propertyRouter.post(
  '/saveFavoriteProperty',
  catchAsync(propertyController.saveFavoriteProperty)
);

propertyRouter.delete(
  '/removeFavoriteProperty',
  catchAsync(propertyController.removeFavoriteProperty)
);

propertyRouter.post(
  '/isFavoriteProperty',
  catchAsync(propertyController.isFavoriteProperty)
);

propertyRouter.put(
  '/addDescription',
  catchAsync(propertyController.addDescription)
);

propertyRouter.put(
  '/addView/:propertyAddress&:city&:postcode',
  propertyController.addView
);

module.exports = propertyRouter;
