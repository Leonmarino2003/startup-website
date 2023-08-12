const express = require('express');

const resetRouter = express.Router();

const { resetController } = require('../controllers');

const catchAsync = require('../globalErrorHandler/catchAsync');

resetRouter.put(
  '/reset/password/new',
  catchAsync(resetController.createPasswordResetCode)
);

resetRouter.put('/reset/password', catchAsync(resetController.resetPassword));

module.exports = resetRouter;
