const express = require('express');

const userRouter = express.Router();

const { userController } = require('../controllers');

const { userIsUserMiddleware } = require('../middleware/userIsUser');

const catchAsync = require('../globalErrorHandler/catchAsync');

userRouter.put('/changePass', userIsUserMiddleware, userController.changePass);

userRouter.get('/getUser/:user', userIsUserMiddleware, userController.getUser);

userRouter.get(
  '/getOwnerProperties/:user',
  userIsUserMiddleware,
  userController.getOwnerProperties
);

userRouter.put(
  '/saveNotifications',
  userIsUserMiddleware,
  userController.saveNotifications
);

userRouter.post('/updateUserInfo', userController.updateUserInfo); // already builded userVerification with JWT

userRouter.get('/getUserInfo', userController.getUserInfo); // already builded userVerification with JWT

userRouter.put('/saveName', userIsUserMiddleware, userController.saveName);

userRouter.put(
  '/savePhoneNumber',
  userIsUserMiddleware,
  userController.savePhoneNumber
);

userRouter.get(
  '/getPhoneNumber/:user',
  userIsUserMiddleware,
  userController.getPhoneNumber
);

userRouter.put(
  '/saveBirthDate',
  userIsUserMiddleware,
  userController.saveBirthDate
);

userRouter.get(
  '/getBirthDate/:user',
  userIsUserMiddleware,
  userController.getBirthDate
);

userRouter.put('/saveGender', userIsUserMiddleware, userController.saveGender);

userRouter.get(
  '/getGender/:user',
  userIsUserMiddleware,
  userController.getGender
);

userRouter.get(
  '/getEmail/:user',
  userIsUserMiddleware,
  userController.getEmail
);

userRouter.get('/getName/:user', userIsUserMiddleware, userController.getName);

userRouter.post(
  '/saveImageURL',
  userIsUserMiddleware,
  userController.saveImageURL
);

userRouter.delete(
  '/deleteImage',
  userIsUserMiddleware,
  userController.deleteImage
);

userRouter.get(
  '/getProfileImage/:user',
  userIsUserMiddleware,
  userController.getProfileImage
);

userRouter.post('/saveDocURL', userIsUserMiddleware, userController.saveDocURL);

userRouter.get('/getRole/:user', userIsUserMiddleware, userController.getRole);

userRouter.get(
  '/getBidRecords/:user',
  userIsUserMiddleware,
  userController.getBidRecords
);

module.exports = userRouter;
