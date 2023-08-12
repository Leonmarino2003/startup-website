const generator = require('generate-password');
const bcrypt = require('bcrypt');

const propertyQueries = require('../databaseServices/property/propertyQueries');
const bidServices = require('../databaseServices/bidServices');

async function passGenerator() {
  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true,
    strict: true,
  });
  console.log('Unhashed generated password:', password);
  let hashedPass = await hashPassword(password);
  const passwordObj = {
    hashedPass: hashedPass,
    unHashedPass: password,
  };
  return passwordObj;
}

//* async hashPassword(password) function
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log('hashed password:', hashedPassword);
  return hashedPassword;
}

async function userCreatedPassword(password) {
  console.log('Unhashed password: ', password)
  let hassedPass = await hashPassword(password)
  const passwordObj = {
    hashedPass: hassedPass,
    unHashedPass: password,
  };
  return passwordObj
}

//* async comparePassword(password, hash) function
async function comparePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  console.log('log inside comparePass in utils', isMatch);
  return isMatch;
}

function getTime() {
  let current = new Date();
  let cDate =
    current.getFullYear() +
    '-' +
    (current.getMonth() + 1) +
    '-' +
    current.getDate();
  let cTime =
    current.getHours() +
    ':' +
    current.getMinutes() +
    ':' +
    current.getSeconds();
  let dateTime = cDate + ' ' + cTime;
  return dateTime;
}

async function findAndAnswerBid(propId, bidId, answer, status) {
  const foundProp = await propertyQueries.findById(propId);
  const biddersArr = foundProp.bidders;
  const foundBid = await findBidInBidders(biddersArr, bidId);
  const newBiddersArr = await modifyBidders(
    biddersArr,
    foundBid,
    answer
    // status
  );
  const answerSuccess = await bidServices.answerBid(propId, newBiddersArr);
  return answerSuccess;
  // console.log('IDK LOG HERE:', newBiddersArr);
}

async function findBidInBidders(biddersArr, bidId) {
  convertedBidId = JSON.stringify(bidId);
  const result = {};
  biddersArr.map((b, index) => {
    convertedId = JSON.stringify(b._id);
    if (convertedId === convertedBidId) {
      result.bid = b;
      result.index = index;
      return result;
    }
    return result;
  });
  return result;
}

async function modifyBidders(biddersArr, foundBid, answer, status) {
  const biddersIndex = foundBid.index;
  biddersArr[biddersIndex].messages.push(answer);
  // biddersArr[biddersIndex].status = status;
  return biddersArr;
}

async function validateFeedback(feedback) {
  const commentMaxLength = 180;
  const response = { success: false };
  // Make sure stars is a number
  if (isNaN(feedback.stars)) {
    response.message = 'Not a number';
    return response;
  }
  // Make sure the number is 1-5
  if (![1, 2, 3, 4, 5].includes(feedback.stars)) {
    response.message = 'Not a valid stars amount';
    return response;
  }
  // Make sure the feedback is max commentMaxLength chars
  // (match this with the frontend form validation)
  if (feedback.comment.length > commentMaxLength) {
    response.message =
      'Comment is too long, please limit to ' + commentMaxLength;
    return response;
  }
  // If all checks pass, return success
  response.success = true;
  return response;
}

module.exports = {
  passGenerator,
  comparePassword,
  getTime,
  findAndAnswerBid,
  hashPassword,
  validateFeedback,
  userCreatedPassword
};
