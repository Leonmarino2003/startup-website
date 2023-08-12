const mongoose = require('mongoose');
const { Schema } = mongoose;
const deniedBidsSchema = new Schema({
    bidData: {
        type: 'Object',
        required: true,
      },
    
    },
    {collection: "deniedbids"});

module.exports = mongoose.model('deniedbids', deniedBidsSchema)