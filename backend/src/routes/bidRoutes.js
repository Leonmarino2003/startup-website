const express = require('express');

const bidRouter = express.Router();

const catchAsync = require('../globalErrorHandler/catchAsync');

const userServices = require('../databaseServices/userServices');

const { bidController } = require('../controllers');

const authorizer = require('../middleware/authorization');

bidRouter.post(
  '/postPendingBid',
  authorizer.authorization(
    ['standard'],
    userServices.findUserById,
    (req) => req.body.user
  ),
  catchAsync(bidController.postPendingBid)
);

bidRouter.post('/anonBid', bidController.anonBid);

bidRouter.post('/answerBid', bidController.answerBid);

bidRouter.delete('/deleteBid/:bidId', bidController.findBidByIdAndDelete);


module.exports = bidRouter;
