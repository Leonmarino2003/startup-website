const express = require('express');

const { authenticationController } = require('./../controllers');

const authenticationRouter = express.Router();

authenticationRouter.post('/login', authenticationController.login);

authenticationRouter.get('/loggedin', authenticationController.loggedin);

module.exports = authenticationRouter;
