const userQueries = require('./user/userQueries');

const { comparePassword } = require('./../utility/utils');

const User = require('./user/user');
const exceptionsManager = require('./../globalErrorHandler/exceptionsManager');
const bid = require('./bid/bid');
const e = require('express');

const ObjectId = require('mongodb').ObjectId;

const confirmUserEmail = async (user) => {
  if (user.verifiedEmail)
    throw new exceptionsManager.BadRequest('User email already verified');

  const updatedUser = await userQueries.setVerifiedEmail(user, true);
  return updatedUser.verifiedEmail;
};

const getAllUsers = userQueries.getAll;

const getBannedUsers = async () => {
  try {
    const bannedUsers = await User.find({ role: 'banned' }); // Find all users with role "banned"
    return bannedUsers;
  } catch (error) {
    // Handle error
    console.error('Error getting banned users:', error);
    throw error;
  }
};

const updateUserRole = async (id, newRole) => {
  try {
    const user = await userQueries.findById(id);
    user.role = newRole;
    await user.save();

    return user;
  } catch (err) {
    console.log(err);
  }
};

const authenticateUser = async (email, password) => {
  const user = await userQueries.findByEmail(email);
  if (!user) return null;

  if (!(await validatePassword(user, password))) return null;

  return user;
};

const updateUserInfo = async (info, id) => {
  const updateObject = { ...info };

  console.log('Update to this information:', updateObject, id);

  try {
    User.findOneAndUpdate(

      {
        _id: new ObjectId(id),
      },
      {
        $set: updateObject,
      },
      null,
      
      ).then(data => console.log(data))
      .catch(error => console.log(error))
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const validatePassword = async (user, password) => {
  const passwordIsMatch = await comparePassword(password, user.password);
  return passwordIsMatch;
};

const validateUser = async (user) => {
  try {
    await User.validate(user);
  } catch (e) {
    throw new exceptionsManager.BadRequest(e.message);
  }
};

const createUser = async (user) => {
  user = new User(user);

  await validateUser(user);
  await user.save();

  return user;
};

const findUserById = async (id) => {
  if (!ObjectId.isValid(id))
    throw new exceptionsManager.BadRequest('Invalid User id provided.');
  const user = await userQueries.findById({ _id: id });
  if (!user) throw new exceptionsManager.UserNotFound('User not found.');
  return user;
};

async function incrementAmountOfDeniedUserBid(userId) {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { amountOfDeniedBids: 1 } },
      { new: true }
    );

    if (user.amountOfDeniedBids >= 3) {
      user.guideProgram = true;
      await user.save();
    }

    return user;
  } catch (err) {
    console.error('Error incrementing warn strike:', err);
    throw err;
  }
}

async function findAndUpdateRole(id, newRole) {
  User.findOneAndUpdate(
    { _id: ObjectId(id) },
    { role: newRole },
    null,
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
}

async function findAndUpdateBanMessage(id, message) {
  User.findOneAndUpdate(
    { _id: ObjectId(id) },
    { banReason: message },
    null,
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
}

async function findAndSendOfferToPropertyOwner(id, message) {
  User.findOneAndUpdate(
    { _id: ObjectId(id) },
    { offerPresented: message },
    null,
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
}

async function incrementWarnStrike(userId) {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { warnStrike: 1 } },
      { new: true }
    );

    if (user.warnStrike >= 3) {
      user.role = 'banned';
      user.banReason = 'Three or more warnings';
      await user.save();
    }

    return user;
  } catch (err) {
    console.error('Error incrementing warn strike:', err);
    throw err;
  }
}

async function findAndUpdateWarnMessage(id, message) {
  User.findOneAndUpdate(
    { _id: ObjectId(id) },
    { warnReason: message },
    null,
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
}

async function findAndUpdateSuspensionMessage(id, message) {
  User.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { suspendReason: message },
    null,
  ).then(data =>  console.log(data))
  .catch(error => console.log(error))
}
async function usersWhoIsInBidGuideProgram() {
  try {
    const users = await User.find({ amountOfDeniedBids: { $gte: 3 } });
    return users;
  } catch (error) {
    console.log(error);
  }
}

async function findUserAndAddBid(userId, bid) {
  console.log(bid);
  try {
    const docs = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $push: { bids: bid } },
      { returnDocument: 'true' }
    ).then(data => console.log(data))
    .catch(error => console.log(error));

    if (!docs) return;
    return docs;
  } catch (err) {
    return err;
  }
}

async function findAndUpdatePass(id, newPass) {
  const user = await userQueries.findById(id);
  if (!user) throw new exceptionsManager.UserNotFound('User not found.');
  user.password = newPass;
  await user.save();
  return user;
}

async function saveNotifications(notifications, id) {
  try {
    User.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { notifications: notifications },
      null,
      function (err, docs) {
        if (err) {
          console.log('err', err);
        } else {
          console.log('docs', docs);
        }
      }
    );
    return true;
  } catch (error) {
    console.log(err);
    return false;
  }
}

async function saveName(firstName, lastName, id) {
  try {
    User.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { name: firstName + ' ' + lastName },
      null,
    ).then(data =>  console.log(data))
    .catch(error => console.log(error));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function savePhoneNumber(phoneNumber, id) {
  try {
    User.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      { phoneNumber: phoneNumber },
      null,
      function (err, docs) {
        if (err) {
          console.log('err', err);
        } else {
          console.log('docs', docs);
        }
      }
    );
    return true;
  } catch (error) {
    console.log(err);
    return false;
  }
}

async function saveBirthDate(birthDay, birthMonth, birthYear, id) {
  try {
    User.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        birthDate: {
          birthDay: birthDay,
          birthMonth: birthMonth,
          birthYear: birthYear,
        },
      },
      null,
      function (err, docs) {
        if (err) {
          console.log('err', err);
        } else {
          console.log('docs', docs);
        }
      }
    );
    return true;
  } catch (error) {
    console.log(err);
    return false;
  }
}

async function saveGender(gender, id) {
  try {
    User.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      { gender: gender },
      null,
      function (err, docs) {
        if (err) {
          console.log('err', err);
        } else {
          console.log('docs', docs);
        }
      }
    );
    return true;
  } catch (error) {
    console.log(err);
    return false;
  }
}

async function saveImage(url, id) {
  try {
    User.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { profileImage: url },
      null,
    ).then(data => console.log(data))
    .catch(error => console.log(error));
    return true;
  } catch (error) {
    console.log(err);
    return false;
  }
}

async function saveDoc(url, email, propertyId) {
  const docObj = {
    propertyId,
    document: url,
    status: 'Pending',
  };
  try {
    User.findOneAndUpdate(
      {
        email: email,
      },
      { $push: { documents: docObj } },
      // { documents: url },
      null,
    ).then(data =>  console.log(data))
    .catch(error => console.log(error));
    return true;
  } catch (error) {
    console.log(err);
    return false;
  }
}

async function findUserBidsArr(user) {
  const foundUser = await User.findById(user);

  try {
    if (foundUser) {
      const foundRecord = foundUser.bids;
      console.log(foundRecord);
      return foundRecord;
    } else {
      console.log(userId);
      console.log('no user found');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function findUserAllBids(userId) {
  try {
    // Find the user by userId
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const bids = await bid.find({ user: userId });

    // pending bids
    const filteredPendingBids = bids.filter((bid) => bid.bidStatus === 1);
    const pendingBidLength = filteredPendingBids.length;
    console.log('Pending bids: ', pendingBidLength);

    // accepted by admin
    const filteredAcceptedByAdminBids = bids.filter(
      (bid) => bid.bidStatus === 2
    );
    const acceptedByAdminBidsLength = filteredAcceptedByAdminBids.length;
    console.log('Accepted by admin Bids: ', acceptedByAdminBidsLength);

    // discussion
    const filteredDiscussionBids = bids.filter((bid) => bid.bidStatus === 3);
    const discussionBidLength = filteredDiscussionBids.length;
    console.log('discussion Bids: ', discussionBidLength);

    // won bids
    const filteredWonBids = bids.filter((bid) => bid.bidStatus === 4);
    const wonBidsLength = filteredWonBids.length;
    console.log('won Bids: ', wonBidsLength);

    // denied bids
    const filteredDeniedBids = bids.filter((bid) => bid.bidStatus === 5);
    const deniedBidsLength = filteredDeniedBids.length;
    console.log('Denied Bids: ', deniedBidsLength);

    // total bids

    const totalBids =
      deniedBidsLength +
      wonBidsLength +
      discussionBidLength +
      acceptedByAdminBidsLength +
      pendingBidLength;
    console.log('Total bids: ', totalBids);

    const filteredBids = {
      filteredPendingBids,
      filteredAcceptedByAdminBids,
      filteredDiscussionBids,
      filteredWonBids,
      filteredDeniedBids,
    };

    return filteredBids;
  } catch (error) {
    throw new Error('Error finding user bids');
  }
}

async function setEmailVerificationCode(user, code) {
  if (!user.codes) user.codes = {};
  user.codes.emailVerificationCode = code;
  await user.save();
}

async function setPasswordResetCode(user, code) {
  if (!user.codes) user.codes = {};
  user.codes.passwordResetCode = code;
  await user.save();
}

async function findUserByEmail(email) {
  let user = await User.findOne({ email });
  return user || null;
}

async function findBy(searchCriteria) {
  if (!searchCriteria || Object.keys(searchCriteria).length === 0) return null;
  let user = await User.findOne(searchCriteria);
  if (!user)
    throw new exceptionsManager.NotFound(
      'User not found with the provided details'
    );
  return user;
}

module.exports = userServices = {
  updateUserInfo,
  authenticateUser,
  confirmUserEmail,
  createUser,
  findUserById,
  getAllUsers,
  updateUserRole,
  incrementAmountOfDeniedUserBid,
  findAndUpdateBanMessage,
  findAndUpdateRole,
  findAndSendOfferToPropertyOwner,
  incrementWarnStrike,
  findAndUpdateWarnMessage,
  findAndUpdateSuspensionMessage,
  usersWhoIsInBidGuideProgram,
  findUserByEmail,
  findUserAndAddBid,
  findAndUpdatePass,
  saveNotifications,
  saveName,
  savePhoneNumber,
  saveBirthDate,
  saveGender,
  saveImage,
  saveDoc,
  findUserBidsArr,
  findUserAllBids,
  getBannedUsers,
  findBy,
  setEmailVerificationCode,
  setPasswordResetCode,
};
