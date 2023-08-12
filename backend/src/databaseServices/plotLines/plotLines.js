const mongoose = require('mongoose');
const { Schema } = mongoose;

const plotlines_bebyggelse_lantmateriet = new Schema({
  type: String, 
  properties: {
    OBJEKT_ID: {
      type: String,
    },
    OBJEKT_VER: {
      type: Number,
    },
    DETALJTYP: {
      type: String,
    },
    ADAT: {
      type: String,
    },
    INSAM_LAGE: {
      type: String,
    },
    ANDAMAL_1: {
      type: Number,
    },
    ANDAMAL_1T: {
      type: String,
    },
  },
  geometry: {
    coordinates: [],
  },
});

module.exports = mongoose.model(
  'plotlines_bebyggelse_lantmateriet',
  plotlines_bebyggelse_lantmateriet
);
