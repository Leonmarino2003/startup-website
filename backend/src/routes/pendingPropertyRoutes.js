const express = require('express');
const { pendingPropertyController } = require('./../controllers');
const pendingPropertyRouter = express.Router();
const catchAsync = require('../globalErrorHandler/catchAsync');
const authorizer = require('../middleware/authorization');
const userServices = require('../databaseServices/userServices');

pendingPropertyRouter.post(
  '/registerPendingProperty',
  authorizer.authorization(
    ['standard'],
    userServices.findUserById,
    (req) => req.body.userId
  ),
  catchAsync(pendingPropertyController.registerPendingProperty)
);

pendingPropertyRouter.get(
  '/getAllPendingProperties',
  catchAsync(pendingPropertyController.getAllPendingProperties)
);

pendingPropertyRouter.get(
  '/getAllPendingPropertiesByUserId/:userId',
  catchAsync(pendingPropertyController.getAllPendingPropertiesByUserId)
);

pendingPropertyRouter.get(
  '/getAllPendingPropertiesByPropertyId/:propertyId',
  catchAsync(pendingPropertyController.getAllPendingPropertiesByPropertyId)
);

pendingPropertyRouter.get(
  '/getPendingPropertyById/:propertyId',
  catchAsync(pendingPropertyController.getPendingPropertyById)
);

pendingPropertyRouter.delete(
  '/deletePendingPropertyById/:propertyId',
  catchAsync(pendingPropertyController.deletePendingPropertyById)
);

module.exports = pendingPropertyRouter;
