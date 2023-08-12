const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  stars: {
    type: 'Number',
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
