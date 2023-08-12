const { ObjectId } = require('mongodb');
const Bid = require('./bid/bid');
const Property = require('./property/property').default;
const DeniedBids = require('./bid/deniedBids')

/**
 * @returns {Array} All found bids
 */
async function findAllBids() {
  const bids = await Bid.find();
  return bids;
}

async function findMultipleBidsById(bidsIdArray) {
  const pBids = await Bid.find().where('_id').in(bidsIdArray).exec();

  const allBids = [...pBids];
  return allBids;
}

async function saveAnonymousBid(body) {
  if (body) {
    let res = {};
    try {
      const bidObject = new Bid({
        amount: body.bid.amount,
        address: {
          street: body.bid.address.street,
          postcode: body.bid.address.postcode,
          city: body.bid.address.city,
          country: body.bid.address.country,
        },
      });
      try {
        const newBid = await bidObject.save();
        if (!newBid) {
          res.success = false;
          res.msg = 'Anonymous bid could not be saved';
          return res;
        } else {
          res.success = true;
          return res;
        }
      } catch (err) {
        res.success = false;
        res.msg = err;
        return res;
      }
    } catch (err) {
      console.log(err);
      res.success = false;
      res.msg = err;
      return res;
    }
  }
}

async function answerBid(propId, newBiddersArr) {
  console.log('newBiddersArr', newBiddersArr);
  try {
    Property.findByIdAndUpdate(
      propId,
      { bidders: newBiddersArr },
      null,
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}



module.exports = bidServices = {
  findAllBids,
  findMultipleBidsById,
  saveAnonymousBid,
  answerBid,
};
