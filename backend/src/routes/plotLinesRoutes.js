const express = require('express');
const plotLinesRouter = express.Router();
const { plotLinesController } = require('../controllers');

plotLinesRouter.get('/plotlines/all', plotLinesController.plotlines);

plotLinesRouter.post(
  '/plotlines/rendered',
  plotLinesController.plotlinesRendered
);

module.exports = plotLinesRouter;
