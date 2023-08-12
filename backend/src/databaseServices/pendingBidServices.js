const exceptionsManager = require('./../globalErrorHandler/exceptionsManager');
const Bid = require('./bid/bid');
const userQueries = require('./user/userQueries');
const { mailer } = require('./../utility/emailservice');
const bid = require('./bid/bid');
const userServices = require('./userServices');

// Pending bid validator
async function validatePendingBid(bid) {
  try {
    await Bid.validate(bid);
  } catch (e) {
    throw new exceptionsManager.BadRequest(e.message);
  }
}

// Find all pending bids
async function findAllPendingBids() {
  const pendingBids = await Bid.find().where('bidStatus', 1);

  return pendingBids;
}

async function findAllAcceptedBidsByAdmin() {
  console.log('abwawawwaewawea');
  const pendingBids = await Bid.find().where('bidStatus', 2);
  return pendingBids;
}

async function findAllDeniedBids() {
  const pendingBids = await Bid.find().where('bidStatus', 5);
  return pendingBids;
}

// Attempt to place a bid on a property
async function placePendingBid(_bid) {
  const bid = new Bid(_bid);
  await validatePendingBid(bid);
  const savedBid = await bid.save();
  return savedBid._id;
}

async function confirmPendingBidById(id) {
  try {
    const pendingBid = await Bid.findByIdAndUpdate(
      id,
      { bidStatus: 2 },
      { new: true }
    );

    if (!pendingBid) {
      console.error(`Pending bid with id ${id} not found`);
      return;
    }

    await pendingBid.save();
    console.log(
      `Pending bid with ID: ${id} has been confirmed and added to the accepted bids by plot eye collection`
    );
  } catch (e) {
    console.error(`Error confirming bid: ${e}`);
  }
}
// accept pending bid
async function acceptPendingBidById(id) {
  const acceptedPendingBid = await findPendingBidById(id);

  let user = await userServices.findUserById(acceptedPendingBid.user);

  if (!user) throw new exceptionsManager.NotFound('User not found');

  await confirmPendingBidById(id);
  if (user.email)
    mailer.pendingBidAccepted(
      user.email,
      'CONGRATULATIONS! Your bid have been accepted on.',
      acceptedPendingBid.address.street
    );
}

async function deletePendingBidById(id) {
  try {
    await Bid.findByIdAndUpdate(id, { bidStatus: 5 });
    Bid.save();
    console.log(
      `Pending bid with ID: ${id} has been denied and added to the denied bids collection`
    );
  } catch (e) {
    console.error(`Error denying bid: ${e}`);
  }
}

// deny pending bid
async function denyPendingBidById(id) {
  const deniedPendingBid = await findPendingBidById(id);
  let user = await userQueries.findById(deniedPendingBid.user);
  if (!user) throw new exceptionsManager.NotFound('User not found');

  await deletePendingBidById(id);
  if (user.email)
    mailer.pendingBidDenied(
      user.email,
      'Your bid have been denied on.',
      deniedPendingBid.address.street
    );
  return;
}

// find pending bid by id - mainly used for accept and deny pending bid
async function findPendingBidById(id) {
  console.log("id : ",id);
  
  try {
    const bid = await Bid.findById(id);

    if (!bid) {
      return { error: 'Pending bid not found' };
    }
    return bid;
  } catch (err) {
    console.error(err);
    return { error: 'An error occurred' };
  }
}

async function changeBidStatusesById(id, updateData) {
  try {
    const pendingBid = await Bid.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document after the update
    );

    if (!pendingBid) {
      console.error(`Bid with id ${id} not found`);
      return null;
    }

    await pendingBid.save();
    console.log(`Statuses for bid with ID: ${id} have been updated with data`, updateData);

    return pendingBid; // Return the updated bid
  } catch (e) {
    console.error(`Error updating status for bid: ${e}`);
    return null;
  }
}

module.exports = pendingBidService = {
  placePendingBid,
  validatePendingBid,
  findAllPendingBids,
  findPendingBidById,
  denyPendingBidById,
  acceptPendingBidById,
  findAllDeniedBids,
  findAllAcceptedBidsByAdmin,
  changeBidStatusesById,
};
