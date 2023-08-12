const Bid = require('./bid/bid')
const DeniedBids = require('./bid/deniedBids')
const User = require('./user/user')
const { ObjectId } = require('mongodb');

async function findAndDeleteBidById(bidId) {//this function remove bids from bid modell and adds it in deniedbids
    console.log("bid id", bidId)

    try {
          const deletedBids = await Bid.findOneAndDelete({"_id": new ObjectId(bidId)}).then(
            async (data) => {
                // puts the deleted data inside of the "bidData" object in deniedbids modell
                const deniedBid = new DeniedBids({
                      bidData: data
                })
                await deniedBid.save();
                return console.log(deniedBid)
            }
            )
        .catch(error => console.log(error))
        console.log(deletedBids)
        return true;
    } catch(error){
        console.log(error)
        return false;
    }
  }
async function removeBidFromUserArray(bidId, userId){
    console.log("bid id", bidId)
    console.log("user id", userId)
    try {
        const user = User.findOneAndUpdate(
            {_id: new ObjectId(userId)},
            {$pull: {bids: new ObjectId(bidId)}},
            {new: true}
        ).then(result => console.log(result))
        .catch(error => console.log(error))
        console.log(user)
        return true;
    } catch(error) {
        console.log(error)
        return false
    }
}

module.exports = cancelledBidServices = {
    findAndDeleteBidById,
    removeBidFromUserArray
};