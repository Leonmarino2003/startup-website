const {
  userServices,
  bidServices,
  propertyServices,
  updateUserInfo,
  findUserById,
} = require('../databaseServices');
const {
  comparePassword,
  hashPassword,
  passGenerator,
} = require('./../utility/utils');
const {
  validateFullName,
  validatePhoneNumber,
  validateBirthDate,
  validateGender,
} = require('./../utility/userFormFieldValidations');
const { passwordMailer } = require('./../utility/emailservice.js');
const jwt = require('jsonwebtoken');
const exceptionsManager = require('../globalErrorHandler/exceptionsManager');
const processPasswordResetCode = require('../services/app/processPasswordResetCode');

const userController = {};

userController.changePass = async (req, res) => {
  const response = {};
  const user = req.body.user;
  const oldPass = req.body.oldPass;
  const newPass = req.body.newPass;
  try {
    const foundUser = await userServices.findUserById(user);
    if (foundUser) {
      const isMatch = await comparePassword(oldPass, foundUser.password);
      if (isMatch) {
        const hashNewPass = await hashPassword(newPass);
        await userServices.findAndUpdatePass(user, hashNewPass);
        response.success = true;
        response.msg = 'Password updated successfully!';
      } else {
        response.success = false;
        response.msg = 'Password did not match';
      }
    } else {
      response.success = false;
      response.msg = 'No user found in body, maybe not logged in?';
    }
    res.json(response);
  } catch (err) {
    console.log(err);
    response.success = false;
    response.msg = err;
    res.json(response);
  }
};

userController.getUser = async (req, res) => {
  const response = {};
  const user = req.params.user;

  if (!user) {
    response.success = false;
    response.msg = 'No user found in params, maybe not logged in?';
    res.json(response);
  } else {
    try {
      const foundUser = await userServices.findUserById(user);

      if (foundUser) {
        const bids = await bidServices.findMultipleBidsById(foundUser.bids);
        response.success = true;
        response.mybids = bids;
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
userController.getOwnerProperties = async (req, res) => {
  const response = {};
  const owner = req.params.user;
  if (!owner) {
    response.success = false;
    response.msg = 'No user found in body, maybe not logged in?';
    res.json(response);
  } else {
    try {
      const foundOwner = await propertyServices.findOwner(owner);
      if (foundOwner) {
        response.success = true;
        response.myproperties = foundOwner;
        res.json(response);
      } else {
        response.success = false;
        response.msg = 'No properties found owned by this user';
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

userController.saveNotifications = async (req, res) => {
  const notifications = req.body.formNotifications;
  const id = req.body.id;

  //const response = await validateNotifications(notifications);
  if (!response.success) {
    res.status(400).json(response);
    return;
  }

  try {
    const foundUser = await userServices.findUserById(id);
    if (foundUser) {
      const trySaveNotifications = await userServices.saveNotifications(
        notifications,
        id
      );
      if (trySaveNotifications) {
        response.message = 'Notifications sent successfully!';
        response.success = true;
      }
    }
  } catch (error) {
    console.log('catch error', error);
    response.error = true;
  }

  res.json(response);
};

userController.updateUserInfo = async (req, res) => {
  console.log(req.body);
  let result = { loggedIn: false, user: 'none' };
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Decoded token:', decodedToken);
        result.loggedIn = true;
        result.user = decodedToken.id;
      }
    });
  }

  updateUserInfo(req.body.userInfo, result.user);
  // updateUserInfo(req.body.userInfo, req.body.id)

  res.status(200).json({ message: 'Hello from the API!' });
};

userController.getUserInfo = async (req, res) => {
  const response = {};
  let result = { loggedIn: false, user: 'none' };
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Decoded token:', decodedToken);
        result.loggedIn = true;
        result.user = decodedToken.id;
      }
    });
  }
  try {
    const foundUser = await findUserById(result.user);
    console.log(foundUser);
    res.json(foundUser);
  } catch (err) {
    console.log(err);
    response.success = false;
    response.msg = err;
    res.json(response);
  }
};

userController.saveName = async (req, res) => {
  const firstName = req.body.formFirstName;
  const lastName = req.body.formLastName;
  const id = req.body.id;

  const fullName = {
    givenName: firstName,
    surname: lastName,
  };
  const response = await validateFullName(fullName);
  if (!response.success) {
    res.status(400).json(response);

    return;
  }

  try {
    const foundUser = await userServices.findUserById(id);
    if (foundUser) {
      const trySaveName = await userServices.saveName(firstName, lastName, id);
      if (trySaveName) {
        response.success = true;
      }
    } else {
    }
  } catch (error) {
    console.log('catch error', error);
    response.error = true;
  }

  res.json(response);
};

userController.savePhoneNumber = async (req, res) => {
  const phoneNumber = req.body.formPhoneNumber;
  const id = req.body.id;
  const response = await validatePhoneNumber(phoneNumber);
  if (!response.success) {
    res.status(400).json(response);
    return;
  }

  try {
    const foundUser = await userServices.findUserById(id);
    if (foundUser) {
      const trySavePhoneNumber = await userServices.savePhoneNumber(
        phoneNumber,
        id
      );
      if (trySavePhoneNumber) {
        response.message = 'Phone number updated successfully!';
        response.success = true;
      }
    }
  } catch (error) {
    console.log('catch error', error);
    response.error = true;
  }

  res.json(response);
};

userController.getPhoneNumber = async (req, res) => {
  const user = req.params.user;
  const response = {
    success: false,
  };
  try {
    const foundUser = await userServices.findUserById(user);
    if (!foundUser) return;
    if (foundUser.phoneNumber) {
      response.phoneNumber = foundUser.phoneNumber;
      response.success = true;
    } else {
      response.message = 'no phonenumber found';
    }
  } catch (error) {
    console.log(error);
  }

  res.json(response);
};

userController.saveBirthDate = async (req, res) => {
  const birthDate = {
    day: req.body.formBirthDay,
    month: req.body.formBirthMonth,
    year: req.body.formBirthYear,
  };
  const id = req.body.id;

  const response = await validateBirthDate(birthDate);
  if (!response.success) {
    res.status(400).json(response);
    return;
  }

  try {
    const foundUser = await userServices.findUserById(id);
    if (foundUser) {
      const trySaveBirthDate = await userServices.saveBirthDate(
        birthDate.day,
        birthDate.month,
        birthDate.year,
        id
      );
      if (trySaveBirthDate) {
        response.success = true;
      }
    } else {
    }
  } catch (error) {
    console.log('catch error', error);
    response.error = true;
  }

  res.json(response);
};

userController.getBirthDate = async (req, res) => {
  const user = req.params.user;
  const response = {
    success: false,
  };
  try {
    const foundUser = await userServices.findUserById(user);
    if (!foundUser) return;
    if (foundUser.birthDate) {
      response.birthDate = foundUser.birthDate;
      response.success = true;
    } else {
      response.message = 'no date of birth found';
    }
  } catch (error) {
    console.log(error);
  }

  res.json(response);
};

userController.saveGender = async (req, res) => {
  const gender = req.body.formGender;
  const id = req.body.id;

  const response = await validateGender(gender);
  if (!response.success) {
    res.status(400).json(response);
    return;
  }

  try {
    const foundUser = await userServices.findUserById(id);
    if (foundUser) {
      const trySaveGender = await userServices.saveGender(gender, id);
      if (trySaveGender) {
        response.success = true;
      }
    }
  } catch (error) {
    console.log('catch error', error);
    response.error = true;
  }

  res.json(response);
};

userController.getGender = async (req, res) => {
  const user = req.params.user;
  const response = {
    success: false,
  };
  try {
    const foundUser = await userServices.findUserById(user);
    if (!foundUser) return;
    if (foundUser.gender) {
      response.gender = foundUser.gender;
      response.success = true;
    } else {
      response.message = 'no gender found';
    }
  } catch (error) {
    console.log(error);
  }

  res.json(response);
};

userController.getEmail = async (req, res) => {
  const user = req.params.user;
  const response = {
    success: false,
  };
  try {
    const foundUser = await userServices.findUserById(user);
    if (!foundUser) return;
    if (foundUser.email) {
      response.email = foundUser.email;
      response.success = true;
    } else {
      response.message = 'no email found';
    }
  } catch (error) {
    console.log(error);
  }

  res.json(response);
};

userController.getName = async (req, res) => {
  const user = req.params.user;
  const response = {
    success: false,
  };
  try {
    const foundUser = await userServices.findUserById(user);
    if (!foundUser) return;
    if (foundUser.name) {
      response.name = foundUser.name;
      response.success = true;
    } else {
      response.message = 'no name found';
    }
  } catch (error) {
    console.log(error);
  }

  res.json(response);
};

userController.saveImageURL = async (req, res) => {
  const { url, user } = req.body;

  const response = {
    success: false,
  };

  try {
    const foundUser = await userServices.findUserById(user);
    if (foundUser) {
      const trySaveImage = await userServices.saveImage(url, user);
      if (trySaveImage) {
        response.success = true;
      }
    } else {
    }
  } catch (error) {
    console.log('catch error', error);
    response.error = true;
  }

  res.json(response);
};

userController.deleteImage = async (req, res) => {
  const { user } = req.body;
  const response = {
    success: false,
  };

  try {
    const foundUser = await userServices.findUserById(user);
    if (foundUser) {
      // The same function can be used as when we save an image, the difference is that
      // now we are using an empty string instead of the URL
      const tryRemoveImage = await userServices.saveImage('', user);
      if (tryRemoveImage) {
        response.success = true;
      }
    } else {
    }
  } catch (error) {
    console.log('catch error', error);
    response.error = true;
  }

  res.json(response);
};

userController.getProfileImage = async (req, res) => {
  const user = req.params.user;
  const response = {
    success: false,
  };
  try {
    const foundUser = await userServices.findUserById(user);
    if (!foundUser) return;
    if (foundUser.profileImage) {
      response.profileImage = foundUser.profileImage;
      response.success = true;
    } else {
      response.message = 'no profile image found';
    }
  } catch (error) {
    console.log(error);
  }

  res.json(response);
};

userController.saveDocURL = async (req, res) => {
  const { url, user, propertyId } = req.body;

  const response = {
    success: false,
  };

  try {
    const foundUser = await userServices.findUserById(user);
    if (foundUser) {
      const trySaveDoc = await userServices.saveDoc(url, user, propertyId);
      if (trySaveDoc) {
        response.success = true;
      }
    } else {
    }
  } catch (error) {
    console.log('catch error', error);
    response.error = true;
  }

  res.json(response);
};

userController.getRole = async (req, res) => {
  const response = {};
  const user = req.params.user;
  if (!user) {
    response.success = false;
    response.msg = 'No user found in params, maybe not logged in?';
    res.json(response);
  } else {
    try {
      const foundUser = await userServices.findUserById(user);
      if (foundUser) {
        response.success = true;
        response.role = foundUser.role;
        res.json(response);
      }
    } catch (err) {
      console.log('err');
      response.success = false;
      response.msg = err;
      res.json(response);
    }
  }
};

userController.getBidRecords = async (req, res) => {
  const response = {};

  const user = req.params.user;

  if (!user) {
    response.success = false;
    response.msg = 'No user ID found in params.';
    res.json(response);
  } else {
    try {
      const foundUser = await userServices.findUserById(user);
      const foundUserBids = await userServices.findUserBidsArr(foundUser);
      if (!foundUser && !foundUserBids) {
        response.success = false;
        response.msg = 'User not found.';
        res.json(response);
      } else if (foundUser && foundUserBids) {
        response.success = true;
        response.data = foundUserBids;
        res.json(response);
      }
    } catch (err) {
      console.error(err);
      response.success = false;
      response.msg = err.message || 'Something went wrong.';
      res.json(response);
    }
  }
};

module.exports = userController;
