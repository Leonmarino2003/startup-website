const exceptionsManager = require('../globalErrorHandler/exceptionsManager');

const configs = require('../services/configs/config');

const {
  userServices,
  pendingBidServices,
  bidServices,
  acceptedBidServices,
  propertyServices,
  pendingPropertyServices,
} = require('../databaseServices');

const {
  bannedMailer,
  pendingBidDenied,
  offeringMail,
  bidGuideMailer,
  unSuspensionMailer,
  warnedMailer,
  pendingPropertyDenied,
} = require('../utility/emailservice');

const adminController = {};

// confirm a pending bid
adminController.confirmPendingBid = async (req, res) => {
  try {
    
    const pendingBidId = req.params.pendingBidId;
    console.log("here : ", pendingBidId);
    const confirmedPendingBid = await pendingBidServices.findPendingBidById(
      pendingBidId
    );

    if (!confirmedPendingBid) {
      return res.status(404).json({ message: 'Pending bid not found' });
    }
    await pendingBidServices.acceptPendingBidById(pendingBidId);
    return res.json({ message: 'Pending bid was confirmed successfully' });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

adminController.adminGetUser = async (req, res) => {
  try {
    const user = req.params.userId;

    const getUser = await userServices.findUserById(user);

    if (!getUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.user = getUser;
    return res.json(getUser);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

adminController.deletePendingProperty = async (req, res, next) => {
  const response = {};
  const propertyId = req.params.pendingPropertyId;
  const deleted = await pendingPropertyServices.deletePendingPropertyById(
    propertyId
  );
  // Find property and user to send mail
  const property = await propertyServices.findPropertyById(deleted.propertyId);
  const user = await userServices.findUserById(deleted.userId);

  pendingPropertyDenied(user.email, property.address);

  response.msg =
    'Deleted pending property from the database and sent mail to user.';
  response.success = true;
  return res.status(200).send(response);
};

// get all users
adminController.getAllUsers = async (req, res, next) => {
  try {
    const response = {};
    const result = await userServices.getAllUsers();
    if (result.length === 0)
      return next(new exceptionsManager.NotFound('No users found'));

    response.msg = result;
    response.success = true;
    return res.status(200).send(response);
  } catch (err) {
    if (err.message === 'Unauthorized Access') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
      });
    }
    return next(err);
  }
};

// ban user
adminController.blockUser = async (req, res, next) => {
  const response = {};
  const newUser = req.params.user;
  const banMessage = req.params.message;
  if (!newUser) {
    response.success = false;
    response.msg = 'No user found in params.';
    res.json(response);
  } else {
    try {
      const foundUser = await userServices.findUserById(newUser);
      if (foundUser) {
        const banned = 'banned';
        await userServices.findAndUpdateRole(foundUser._id, banned);
        await userServices.findAndUpdateBanMessage(foundUser._id, banMessage);
        bannedMailer(foundUser.email, banMessage);
        response.success = true;
        response.role = foundUser.role;
        res.json(response);
      }
    } catch (err) {
      console.log(err);
      response.success = false;
      response.msg = err;
      res.json(response);
    }
  }
};

// get ALL bids
adminController.getAllBids = async (req, res, next) => {
  try {
    const response = {};
    const result = await bidServices.findAllBids();
    if (result.length === 0)
      return next(new exceptionsManager.NotFound('No bids/properties  found'));

    response.msg = result;
    response.success = true;
    return res.status(200).send(response);
  } catch (err) {
    if (err.message === 'Unauthorized Access') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
      });
    }
    return next(err);
  }
};

// deny pending bid
adminController.denyPendingBid = async (req, res) => {
  try {
    const pendingBidId = req.params.pendingBidId;

    const deniedPendingBid = await pendingBidServices.findPendingBidById(
      pendingBidId
    );

    if (!deniedPendingBid) {
      return res.status(404).json({ message: 'Pending bid not found' });
    }

    await pendingBidServices.denyPendingBidById(pendingBidId);
    console.log('aasdwaww2132');
    const user = await userServices.findUserById(deniedPendingBid.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await userServices.incrementAmountOfDeniedUserBid(user._id);
    if (user.amountOfDeniedBids >= 3 && user.email) {
      await bidGuideMailer(user.email);
    }

    if (user.email) {
      await pendingBidDenied(user.email, deniedPendingBid.address);
      console.log('Email sent to:', user.email);
    }
    return res.json({ message: 'Pending bid was denied successfully' });
  } catch (error) {
    /*     if (user && user.email) {
          await pendingBidDenied(user.email);
          console.log('Email sent to:', user.email);
        } */
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

// get all denied bids
adminController.getAllDeniedBids = async (req, res, next) => {
  try {
    const response = {};
    const deniedPendingBids = await pendingBidServices.findAllDeniedBids();
    if (deniedPendingBids.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No pending bids found',
      });
    }

    const promises = deniedPendingBids.map(async (bid) => {
      const user = await userServices.findUserById(bid.user);
      return {
        ...bid._doc,
        ...(user.email && { userEmail: user.email }),
        ...(user.name &&
          user.name.firstName && { userFirstName: user.name.firstName }),
        ...(user.name &&
          user.name.lastName && { userLastName: user.name.lastName }),
        ...(user.birthDate &&
          user.birthDate.birthYear && { year: user.birthDate.birthYear }),
        ...(user.birthDate &&
          user.birthDate.birthMonth && { month: user.birthDate.birthMonth }),
        ...(user.birthDate &&
          user.birthDate.birthDay && { day: user.birthDate.birthDay }),
        ...(user.phoneNumber && { phone: user.phoneNumber }),
        ...(user.gender && { gender: user.gender }),
      };
    });

    const result = await Promise.all(promises);
    response.json;
    response.msg = `Found Bids.`;
    response.success = true;
    response.properties = result;
    return res.status(200).send(response);
  } catch (err) {
    if (err.message === 'Unauthorized Access') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
      });
    }
    return next(err);
  }
};

// Get all pending bids
adminController.getAllPendingBids = async (req, res, next) => {
  try {
    const response = {};
    const bids = await pendingBidServices.findAllPendingBids();
    if (bids.length === 0)
      return next(new exceptionsManager.NotFound('No pending bids found'));

    const promises = bids.map(async (bid) => {
      const user = await userServices.findUserById(bid.user);
      return {
        ...bid._doc,
        ...(user.email && { userEmail: user.email }),
        ...(user.name &&
          user.name.firstName && { userFirstName: user.name.firstName }),
        ...(user.name &&
          user.name.lastName && { userLastName: user.name.lastName }),
        ...(user.birthDate &&
          user.birthDate.birthYear && { year: user.birthDate.birthYear }),
        ...(user.birthDate &&
          user.birthDate.birthMonth && { month: user.birthDate.birthMonth }),
        ...(user.birthDate &&
          user.birthDate.birthDay && { day: user.birthDate.birthDay }),
        ...(user.phoneNumber && { phone: user.phoneNumber }),
        ...(user.gender && { gender: user.gender }),
      };
    });
    const result = await Promise.all(promises);

    response.msg = `Found Bids.`;
    response.success = true;
    response.properties = result;
    return res.status(200).send(response);
  } catch (err) {
    if (err.message === 'Unauthorized Access') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
      });
    }
    return next(err);
  }
};

// gets all accepted bids by the admins
adminController.getAllBidsAcceptedByAdmin = async (req, res, next) => {
  try {
    const response = {};

    const acceptedBidsByAdmin =
      await pendingBidServices.findAllAcceptedBidsByAdmin();
    if (acceptedBidsByAdmin.length === 0)
      return next(new exceptionsManager.NotFound('No pending bids found'));

    const promises = acceptedBidsByAdmin.map(async (bid) => {
      const user = await userServices.findUserById(bid.user);
      return {
        ...bid._doc,
        ...(user.email && { userEmail: user.email }),
        ...(user.name &&
          user.name.firstName && { userFirstName: user.name.firstName }),
        ...(user.name &&
          user.name.lastName && { userLastName: user.name.lastName }),
        ...(user.birthDate &&
          user.birthDate.birthYear && { year: user.birthDate.birthYear }),
        ...(user.birthDate &&
          user.birthDate.birthMonth && { month: user.birthDate.birthMonth }),
        ...(user.birthDate &&
          user.birthDate.birthDay && { day: user.birthDate.birthDay }),
        ...(user.phoneNumber && { phone: user.phoneNumber }),
        ...(user.gender && { gender: user.gender }),
      };
    });
    const result = await Promise.all(promises);

    response.msg = `Found Bids.`;
    response.success = true;
    response.properties = result;
    return res.status(200).send(response);
  } catch (err) {
    if (err.message === 'Unauthorized Access') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
      });
    }
    return next(err);
  }
};

adminController.updateBidStatuses = async (req, res) => {
  try {
    const updateData = req.body;
    const acceptedBidByAdminId = req.params.bidId;
    const updateAcceptedBidByAdmin =
      await pendingBidServices.findPendingBidById(acceptedBidByAdminId);
    if (!updateAcceptedBidByAdmin) {
      return res
        .status(404)
        .send(`bid with ID ${acceptedBidByAdminId} not found`);
    }
    const updatedBid = await pendingBidServices.changeBidStatusesById(
      updateAcceptedBidByAdmin._id,
      updateData
    );
    res.send(updatedBid);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to update pending bid status.');
  }
};

adminController.presentPendingBidToOwner = async (req, res, next) => {
  const response = {};
  const owner = req.params.user;
  const messageToOwner = req.params.message;

  if (!owner) {
    response.success = false;
    response.msg = 'No user found!';
    res.json(response);
  } else {
    try {
      const foundOwner = await propertyServices.findOwner(owner);

      if (foundOwner) {
        await userServices.findAndSendOfferToPropertyOwner(
          foundOwner._id,
          messageToOwner
        );
        offeringMail(foundOwner.email, messageToOwner);
        response.success = true;
        res.json(response);
      }
    } catch (error) {
      console.log(err);
      response.success = false;
      response.msg = err;
      res.json(response);
    }
  }
};

//3 strikes => ban
adminController.warnUser = async (req, res, next) => {
  const response = {};
  const newUser = req.params.user;
  const warnMessage = req.params.message;

  if (!newUser) {
    response.success = false;
    response.msg = 'No user was found';
    res.json(response);
  } else {
    try {
      const foundUser = await userServices.findUserById(newUser);
      if (foundUser) {
        let userUpdated = false;
        if (foundUser.warnStrike >= configs.businessConfig.user.warnsUntilBan) {
          const banned = 'banned';
          await userServices.findAndUpdateRole(foundUser._id, banned);
          await userServices.findAndUpdateBanMessage(
            foundUser._id,
            'you have 3 warns = ban'
          );
          bannedMailer(foundUser.email, 'you have 3 warns = ban');
          response.success = true;
          response.role = foundUser.role;
          res.json(response);
          userUpdated = false;
        }

        if (!userUpdated) {
          const warned = 'warned';
          await userServices.incrementWarnStrike(foundUser._id);
          await userServices.findAndUpdateRole(foundUser._id, warned);
          await userServices.findAndUpdateWarnMessage(
            foundUser._id,
            warnMessage
          );
          response.success = true;
          response.role = foundUser.role;
          res.json(response);
        }

        if (foundUser.email) {
          await warnedMailer(foundUser.email, warnMessage);
          console.log('Email sent to:', foundUser.email);
        }
      }
    } catch (error) {
      console.log(error);
      response.success = false;
      response.msg = error;
      res.json(response);
    }
  }
};

// TODO: fix suspend user should be for a week (will be addeed if not)
adminController.suspendUser = async (res, req, next) => {
  const response = {};
  const newUser = req.params.user;
  const suspensionMessage = req.params.message;
  if (!newUser) {
    response.success = false;
    response.msg = 'No user found.';
    res.json(response);
  } else {
    try {
      const foundUser = await userServices.findUserById(newUser);
      if (foundUser) {
        const suspend = 'suspend';
        await userServices.findAndUpdateRole(foundUser._id, suspend);
        await userServices.findAndUpdateSuspensionMessage(
          foundUser._id,
          suspensionMessage
        );
        suspendMailer(foundUser.email, suspensionMessage);
        response.success = true;
        response.role = foundUser.role;
        res.json(response);
      }
    } catch (err) {
      console.log(err);
      response.success = false;
      response.msg = err;
      res.json(response);
    }
  }
};

adminController.unsuspendOrUnbanUser = async (req, res, next) => {
  const response = {};
  const newUser = req.params.user;
  if (!newUser) {
    response.success = false;
    response.msg = 'No user found in params.';
    res.json(response);
  } else {
    try {
      const foundUser = await userServices.findUserById(newUser);
      if (foundUser) {
        const normalUser = 'normalUser';
        await userServices.findAndUpdateRole(foundUser._id, normalUser);
        unSuspensionMailer(foundUser.email);
        response.success = true;
        response.role = foundUser.role;
        res.json(response);
        console.log('Email sent to:', foundUser.email);
      }
    } catch (err) {
      console.log(err);
      response.success = false;
      response.msg = err;
      res.json(response);
    }
  }
};

adminController.userWhoIsInBidGuideProgram = async (req, res, next) => {
  try {
    const response = {};
    const result = await userServices.usersWhoIsInBidGuideProgram();
    if (result.length === 0) {
      return next(new exceptionsManager.NotFound('No users found'));
    }
    console.log(result);
    response.msg = result;
    response.success = true;
    res.status(200).json(response);
  } catch (err) {
    if (err.message === 'Unauthorized Access') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
      });
    }
    return next(err);
  }
};

adminController.getTotalUserBids = async (req, res, next) => {
  const response = {};
  const userId = req.params.user;
  if (!userId) {
    response.success = false;
    response.msg = 'No user found.';
    res.json(response);
  } else {
    try {
      const result = await userServices.findUserAllBids(userId);
      if (!result) {
        return next(new exceptionsManager.NotFound('No user or bids found.'));
      } else {
        response.success = true;
        response.user = userId;
        response.pendingBids = result.filteredPendingBids.length;
        response.acceptedBids = result.filteredAcceptedByAdminBids.length;
        response.wonBids = result.filteredWonBids.length;
        response.deniedBids = result.filteredDeniedBids.length;
        response.discussionBids = result.filteredDiscussionBids.length;

        res.json(response);
      }
    } catch (err) {
      console.log(err);
      response.success = false;
      response.msg = err.message;
      res.json(response);
    }
  }
};

adminController.getUserBids = async (req, res, next) => {
  console.log('abc');
  const response = {};
  const userId = req.params.user;
  if (!userId) {
    response.success = false;
    response.msg = 'No user found.';
    res.json(response);
  } else {
    try {
      const result = await userServices.findUserAllBids(userId);
      if (!result) {
        return next(new exceptionsManager.NotFound('No user or bids found.'));
      } else {
        response.success = true;
        response.user = userId;
        response.pendingBids = result.filteredPendingBids;
        response.acceptedBids = result.filteredAcceptedByAdminBids;
        response.wonBids = result.filteredWonBids;
        response.deniedBids = result.filteredDeniedBids;
        response.discussionBids = result.filteredDiscussionBids;

        res.json(response);
      }
    } catch (err) {
      console.log(err);
      response.success = false;
      response.msg = err.message;
      res.json(response);
    }
  }
};

adminController.getBannedUsers = async (req, res, next) => {
  try {
    const result = await userServices.getBannedUsers();
    if (result.length === 0) {
      return next(new exceptionsManager.NotFound('No users found'));
    }

    const response = {
      success: true,
      msg: result,
    };
    res.status(200).json(response);
  } catch (err) {
    if (err.message === 'Unauthorized Access') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
      });
    }
    return next(err);
  }
};


/*adminController.findBidById = async (req, res) => {
  console.log("got here");
  try {
    const bidId = req.params.bidId;
    const bidData =
      await pendingBidServices.findPendingBidById(bidId);
    if (!bidData) {
      return res
        .status(404)
        .send(`bid with ID ${bidId} not found`);
    }
    res.send(bidData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch bid data.');
  }
};*/

module.exports = adminController;
