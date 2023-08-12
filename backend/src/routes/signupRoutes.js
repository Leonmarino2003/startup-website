const express = require('express');
const signUpRouter = express.Router();

const catchAsync = require('../globalErrorHandler/catchAsync');

const { signUpController } = require('./../controllers');

//User signs up with email
signUpRouter.post('/signUp', catchAsync(signUpController.signUp));

//User confirms email
signUpRouter.post('/confirmSignup', catchAsync(signUpController.confirmSignup));

module.exports = signUpRouter;
