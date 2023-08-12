const express = require('express');
const adminRouter = express.Router();

const catchAsync = require('../globalErrorHandler/catchAsync');
const { isAdmin, isBlocked } = require('../middleware/rolesCheck');

const { adminController } = require('../controllers');

adminRouter.get(
  '/adminGetUser/:userId',
  catchAsync(adminController.adminGetUser)
);

adminRouter.post(
  '/confirmPendingBid/:pendingBidId',
  isAdmin,
  catchAsync(adminController.confirmPendingBid)
);

adminRouter.delete(
  '/admin/deletePendingPropertyById/:pendingPropertyId',
  isAdmin,
  catchAsync(adminController.deletePendingProperty)
);

adminRouter.get(
  '/getAllUsers',
  isAdmin,
  catchAsync(adminController.getAllUsers)
);

adminRouter.put(
  '/blockUser/:user&:message',
  isAdmin,
  catchAsync(adminController.blockUser)
);

adminRouter.get('/getAllBids', isAdmin, catchAsync(adminController.getAllBids));

adminRouter.post(
  '/denyPendingBid/:pendingBidId',
  isAdmin,
  catchAsync(adminController.denyPendingBid)
);

adminRouter.get(
  '/getAllDeniedBids',
  catchAsync(adminController.getAllDeniedBids)
);

adminRouter.get(
  '/getAllPendingBids',
  isAdmin,
  catchAsync(adminController.getAllPendingBids)
);

adminRouter.get(
  '/getAllBidsAcceptedByAdmin',
  isAdmin,
  catchAsync(adminController.getAllBidsAcceptedByAdmin)
);

adminRouter.put(
  '/updateBidStatuses/:bidId',
  isAdmin,
  catchAsync(adminController.updateBidStatuses)
);

adminRouter.put(
  '/presentPendingBidToOwner/:user&:message',
  isAdmin,
  catchAsync(adminController.presentPendingBidToOwner)
);

adminRouter.put(
  '/warnUser/:user&message',
  isAdmin,
  catchAsync(adminController.warnUser)
);

adminRouter.put(
  '/suspendUser/:user&message',
  isAdmin,
  catchAsync(adminController.suspendUser)
);

adminRouter.put(
  '/unsuspendOrUnbanUser/:user',
  isAdmin,
  catchAsync(adminController.unsuspendOrUnbanUser)
);

adminRouter.put(
  '/getBid/:bidId',
  isAdmin,
  catchAsync(adminController.findBidById)
);

adminRouter.get(
  '/userWhoIsInBidGuideProgram',
  isAdmin,
  catchAsync(adminController.userWhoIsInBidGuideProgram)
);

adminRouter.get(
  '/getTotalBids/:user',
  catchAsync(adminController.getTotalUserBids)
);
adminRouter.get('/getBannedUsers', catchAsync(adminController.getBannedUsers));

adminRouter.get('/getUserBids/:user', catchAsync(adminController.getUserBids));



module.exports = adminRouter; 
