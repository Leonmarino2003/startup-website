const mongoose = require('mongoose');
const { Schema } = mongoose;

const bidsSchema = new Schema({
  user: {
    ref: 'User',
    type: 'ObjectId',
    required: true,
  },

  amount: {
    type: Number,
    required: true,
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

    bidDate: {
      type: Date,
      required: false,
      default: Date.now,
    },
  },
  bidStatus: {
    type: Number,
    required: false,
    default: 1,
  },

  bidStatuses: {
    processStarted: {
      checkBox: {
        type: Boolean,
      },
      message: {
        type: String,
      },
    },

    contactOwner: {
      checkBox: {
        type: Boolean,
      },
      message: {
        type: String,
      },

      presented: {
        checkBox: {
          type: Boolean,
        },
        message: {
          type: String,
        },
      },


      ownerReply: {
        checkBox: {
          type: Boolean,
        },
        accept: {
          type: Boolean,
        },
        message: {
          type: String,
        },
      },
    },

    closeProcess: {
      checkBox: {
        type: Boolean,
      },
      message: {
        type: String,
      },
    },  

    adminRefuseMessage:{
      type: String,
    },

  },
});

module.exports = mongoose.model('Bid', bidsSchema);
