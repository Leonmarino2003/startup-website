const { plotLineServices } = require('./../databaseServices');

const plotLinesController = {};

plotLinesController.plotlines = async (req, res) => {
  const plotlines = await plotLineServices.findAllPlotlines();
  res.json(plotlines);
};
plotLinesController.plotlinesRendered = async (req, res) => {
  const bounds = req.body;
  const renderedPlotlines = await plotLineServices.findPlotlinesInRectangle(
    bounds
  );
  res.json(renderedPlotlines);
};

module.exports = plotLinesController;
