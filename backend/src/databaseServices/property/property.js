
const mongoose = require('mongoose');
const { Schema } = mongoose;



const propertySchema = new Schema({
  owner: {
    ref: 'User',
    type: 'ObjectId',
    required: false,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  bids: [{ type: 'ObjectId', ref: 'PendingBid' },
  {type: 'ObjectId', ref: 'AcceptedBidByPlotEye'},
  {type: 'ObjectId', ref: 'DeniedPendingBid'},
  ],
  premiumInfo: {
    area: {
      type: Number,
    },
    circumference: {
      type: Number,
    },
    district: {
      type: String,
    },
  },
  stats: {
    views: {
      type: Number,
      required: false,
    },
    clickViews:{
      type: Number,
      required: false,
    }
  },
  description: {
    type: String,
  },
});

propertySchema.index(
  { 'address.street': 1, 'address.postcode': 1, 'address.city': 1, 'address.country': 1 },
  { unique: true }
);


module.exports = mongoose.model('Property', propertySchema);

