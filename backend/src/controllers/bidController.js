const {
  userServices,
  pendingBidServices,
  bidServices,
  propertyServices,
  cancelledBidServices,
} = require('../databaseServices');

const bidController = {};

const { getTime, findAndAnswerBid } = require('./../utility/utils');

bidController.postPendingBid = async (req, res) => {
  const response = {};
  const bid = req.body.bid;
  console.log(bid);
  const user = req.body.user;
  const timeNow = getTime();

  const messageObj = {
    from: user,
    time: timeNow,
    message: req.body.message,
  };

  try {
    const foundUser = await userServices.findUserById(user);
    if (!foundUser) {
      response.success = false;
      response.msg = 'No user found in database';
      res.status(418).json(response);
      return;
    } else {
      const pendingBid = {
        user: user,
        amount: bid.amount,
        address: bid.address,
        messages: messageObj,
      };

      const foundPendingBid = await pendingBidServices.placePendingBid(
        pendingBid
      );

      if (foundPendingBid && foundUser) {
        const plotFound = await propertyServices.findPlot(bid.address);

        if (!plotFound) {
          await propertyServices.createProperty(bid.address);
        }
        // We need still to create property.

        await userServices.findUserAndAddBid(user, foundPendingBid);
        await propertyServices.findPropertyAndAddBid(
          pendingBid,
          foundPendingBid
        );
        response.success = true;
        res.status(200).json(response);
      }
    }
  } catch (err) {
    console.log(err);
    response.success = false;
    response.msg = err;
    res.status(418).json(response);
  }
};

bidController.anonBid = async (req, res) => {
  console.log('Posting anonymous bid!');
  const response = {};
  const saveBidSuccess = await bidServices.saveAnonymousBid(req.body);
  if (!saveBidSuccess.success) {
    res.status(400).json({ message: saveBidSuccess.msg });
  } else {
    response.success = true;
    console.log('Bid successfully sent to database!');
    res.json(response);
  }
};

bidController.answerBid = async (req, res) => {
  const response = {};
  const owner = req.body.user;
  const propId = req.body.propId;
  const bidId = req.body.bidId;
  const timeNow = getTime();
  const status = req.body.status;
  const answer = {
    from: owner,
    message: req.body.message,
    time: timeNow,
    status,
  };
  const foundBid = await findAndAnswerBid(propId, bidId, answer, status);
  if (foundBid) {
    response.answer = answer;
    // response.status = status;
  }

  res.json(response);
};

bidController.findBidByIdAndDelete = async(req, res) =>{
  const response = {};
  const bidId = req.params.bidId.toString();
  const userId = req.body.user
  console.log(typeof bidId)
  try {
    
  const deletedBid = await cancelledBidServices.findAndDeleteBidById(bidId)
  if(!deletedBid){
    console.log("Bid failed to be deleted")
    response.message = "Bid failed to be deleted"
    response.success = false;
    res.json(response)
  }else {
    const removedBidFromUserArray = await cancelledBidServices.removeBidFromUserArray(bidId, userId)
    if(!removedBidFromUserArray){
      console.log("Bid failed to be removed from user bids array")
    }
    response.message = "Bid has been deleted successfully and sent to denied bids schema";
    response.success = true;
    console.log("Bid has been deleted successfully and sent to denied bids schema")
    res.json(response)
  }
  }catch(error) {
    res.status(error.status || 500).json(
      {message: error.message, 
      })
  }
}

module.exports = bidController;
