const plotlines_lantmatariet = require('./plotLines/plotLines');

const { plotLinesConfig } = require('../services/configs/config');

async function findAllPlotlines() {
  const plotlines = await plotlines_lantmatariet.find();
  return plotlines;
}

async function findPlotlinesInRectangle(rectangleBounds) {
  const [minLng, minLat, maxLng, maxLat] = rectangleBounds;

  const renderedPlotlines = await plotlines_lantmatariet.find({
    'properties.DETALJTYP': { $in: ['HUS'] },
    'properties.ANDAMAL_1T': { $in: ['Bostad; Småhus friliggande'] },
    geometry: {
      $geoWithin: {
        $geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [minLng, minLat],
              [maxLng, minLat],
              [maxLng, maxLat],
              [minLng, maxLat],
              [minLng, minLat], // Close the polygon
            ],
          ],
        },
      },
    },
  });

  return renderedPlotlines;
}

module.exports = plotLineServices = {
  findAllPlotlines,
  findPlotlinesInRectangle,
};
