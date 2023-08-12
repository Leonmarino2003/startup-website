const express = require('express');

const { feedbackController } = require('../controllers');
const feedbackRouter = express.Router();

feedbackRouter.post('/postFeedback', feedbackController.postFeedback);

module.exports = feedbackRouter;
