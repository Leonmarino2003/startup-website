const mongoose = require('mongoose');
const { Schema } = mongoose;

const pendingPropertySchema = new Schema({
  userId: {
    ref: 'User',
    type: 'ObjectId',
    required: true,
  },
  propertyId: {
    ref: 'Property',
    type: 'ObjectId',
    required: true,
  },
  creationDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

pendingPropertySchema.index({ userId: 1, propertyId: 1 }, { unique: true });

module.exports = mongoose.model('PendingProperty', pendingPropertySchema);
