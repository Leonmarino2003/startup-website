/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/plotlines/rendered",
        destination: "https://dev-branch-server.herokuapp.com/api/plotlines/rendered",
      },
      {
        source: "/api/postFeedback",
        destination: "https://dev-branch-server.herokuapp.com/api/postFeedback",
      },
      {
        source: "/api/postBid",
        destination: "https://dev-branch-server.herokuapp.com/api/postBid",
      },
      {
        source: "/api/login",
        destination: "https://dev-branch-server.herokuapp.com/api/login",
      },
      {
        source: "/api/loggedin",
        destination: "https://dev-branch-server.herokuapp.com/api/loggedin",
      },
      {
        source: "/api/changePass",
        destination: "https://dev-branch-server.herokuapp.com/api/changePass",
      },
      {
        source: "/api/signUp",
        destination: "https://dev-branch-server.herokuapp.com/api/signUp",
      },
      {
        source: "/api/confirmSignup",
        destination: "https://dev-branch-server.herokuapp.com/api/confirmSignup",
      },
      {
        source: "/api/getUser/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getUser/:user",
      },
      {
        source: "/api/adminGetUser/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/adminGetUser/:user",
      },
      {
        source: "/api/admin/registerPropertyOwner",
        destination: "https://dev-branch-server.herokuapp.com/api/admin/registerPropertyOwner",
      },
      {
        source: "/api/getOwnerProperties/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getOwnerProperties/:user",
      },
      {
        source: "/api/anonBid",
        destination: "https://dev-branch-server.herokuapp.com/api/anonBid",
      },
      {
        source: "/api/changePass",
        destination: "https://dev-branch-server.herokuapp.com/api/changePass",
      },
      {
        source: "/api/saveName",
        destination: "https://dev-branch-server.herokuapp.com/api/saveName",
      },
      {
        source: "/api/getName/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getName/:user",
      },
      {
        source: "/api/saveImageURL",
        destination: "https://dev-branch-server.herokuapp.com/api/saveImageURL",
      },
      {
        source: "/api/deleteImage",
        destination: "https://dev-branch-server.herokuapp.com/api/deleteImage",
      },
      {
        source: "/api/getProfileImage/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getProfileImage/:user",
      },
      {
        source: "/api/addDescription",
        destination: "https://dev-branch-server.herokuapp.com/api/addDescription",
      },
      {
        source: "/api/answerBid",
        destination: "https://dev-branch-server.herokuapp.com/api/answerBid",
      },
      {
        source: "/api/saveDocURL",
        destination: "https://dev-branch-server.herokuapp.com/api/saveDocURL",
      },
      {
        source: "/api/savePhoneNumber",
        destination: "https://dev-branch-server.herokuapp.com/api/savePhoneNumber",
      },
      {
        source: "/api/saveBirthDate",
        destination: "https://dev-branch-server.herokuapp.com/api/saveBirthDate",
      },
      {
        source: "/api/saveGender",
        destination: "https://dev-branch-server.herokuapp.com/api/saveGender",
      },
      {
        source: "/api/getPhoneNumber/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getPhoneNumber/:user",
      },
      {
        source: "/api/getBirthDate/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getBirthDate/:user",
      },
      {
        source: "/api/getGender/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getGender/:user",
      },
      {
        source: "/api/getEmail/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getEmail/:user",
      },
      {
        source: "/api/saveFavoriteProperty",
        destination: "https://dev-branch-server.herokuapp.com/api/saveFavoriteProperty",
      },
      {
        source: "/api/removeFavoriteProperty",
        destination: "https://dev-branch-server.herokuapp.com/api/removeFavoriteProperty",
      },
      {
        source: "/api/getFavoriteProperties/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getFavoriteProperties/:user",
      },
      {
        source: "/api/saveNotifications",
        destination: "https://dev-branch-server.herokuapp.com/api/saveNotifications",
      },
      {
        source: "/api/getNotifications/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getNotifications/:user",
      },
      {
        source: "/api/registerPendingProperty",
        destination: "https://dev-branch-server.herokuapp.com/api/registerPendingProperty",
      },
      {
        source: "/api/addView/:propertyAddress",
        destination: "https://dev-branch-server.herokuapp.com/api/addView/:propertyAddress",
      },
      {
        source: "/api/getAllPendingPropertiesByUserId/:userId",
        destination:
          "https://dev-branch-server.herokuapp.com/api/getAllPendingPropertiesByUserId/:userId",
      },
      {
        source: "/api/getAllPendingPropertiesByPropertyId/:propertyId",
        destination:
          "https://dev-branch-server.herokuapp.com/api/getAllPendingPropertiesByPropertyId/:propertyId",
      },
      {
        source: "/api/getPendingPropertyById/:pendingPropertyId",
        destination:
          "https://dev-branch-server.herokuapp.com/api/getPendingPropertyById/:pendingPropertyId",
      },
      {
        source: "/api/deletePendingPropertyById",
        destination: "https://dev-branch-server.herokuapp.com/api/deletePendingPropertyById",
      },
      {
        source: "/api/admin/deletePendingPropertyById/:pendingPropertyId",
        destination:
          "https://dev-branch-server.herokuapp.com/api/admin/deletePendingPropertyById/:pendingPropertyId",
      },
      {
        source: "/api/deletePendingPropertyById/:propertyId",
        destination:
          "https://dev-branch-server.herokuapp.com/api/deletePendingPropertyById/:propertyId",
      },
      {
        source: "/api/getAllUsers",
        destination: "https://dev-branch-server.herokuapp.com/api/getAllUsers",
      },
      { 
        source: "/api/getAllBids",
        destination: "https://dev-branch-server.herokuapp.com/api/getAllBids",
      },
      {
        source: "/api/getAllPendingProperties",
        destination: "https://dev-branch-server.herokuapp.com/api/getAllPendingProperties",
      },
      {
        source: "/api/reset/password",
        destination: "https://dev-branch-server.herokuapp.com/api/reset/password",
      },
      {
        source: "/api/reset/password/new",
        destination: "https://dev-branch-server.herokuapp.com/api/reset/password/new",
      },
      {
        source: "/api/getRole/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getRole/:user",
      },
      {
        source: "/api/blockUser/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/blockUser/:user",
      },
      {
        source: "/api/getAllPendingBids",
        destination: "https://dev-branch-server.herokuapp.com/api/getAllPendingBids",
      },
      {
        source: "/api/postPendingBid",
        destination: "https://dev-branch-server.herokuapp.com/api/postPendingBid",
      },
      {
        source: "/api/denyPendingBid/:pendingBid",
        destination: "https://dev-branch-server.herokuapp.com/api/denyPendingBid/:pendingBid",
      },
      {
        source: "/api/confirmPendingBid/:pendingBidId",
        destination: "https://dev-branch-server.herokuapp.com/api/confirmPendingBid/:pendingBidId",
      },
      {
        source: "/api/updateBidStatuses/:bidId",
        destination: "https://dev-branch-server.herokuapp.com/api/updateBidStatuses/:bidId",
      },
      {
        source: "/api/presentPendingBidToOwner/:user&:message",
        destination:
          "https://dev-branch-server.herokuapp.com/api/presentPendingBidToOwner/:user&:message",
      },
      {
        source: "/api/getAllBidsAcceptedByAdmin",
        destination: "https://dev-branch-server.herokuapp.com/api/getAllBidsAcceptedByAdmin",
      },
      {
        source: "/api/unsuspendOrUnbanUser/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/unsuspendOrUnbanUser/:user",
      },
      {
        source: "/api/suspendUser/:user&message",
        destination: "https://dev-branch-server.herokuapp.com/api/suspendUser/:user&message",
      },
      {
        source: "/api/warnUser/:user&message",
        destination: "https://dev-branch-server.herokuapp.com/api/warnUser/:user&message",
      },
      {
        source: "/api/isFavoriteProperty",
        destination: "https://dev-branch-server.herokuapp.com/api/isFavoriteProperty",
      },
      {
        source: "/api/userWhoIsInBidGuideProgram",
        destination: "https://dev-branch-server.herokuapp.com/api/userWhoIsInBidGuideProgram",
      },
      {
        source: "/api/getBidRecords/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getBidRecords/:user",
      },
      {
        source: "/api/getAllDeniedBids",
        destination: "https://dev-branch-server.herokuapp.com/api/getAllDeniedBids",
      },
      {
        source: "/api/getTotalBids/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getTotalBids/:user",
      },
      {
        source: "/api/getBannedUsers",
        destination: "https://dev-branch-server.herokuapp.com/api/getBannedUsers",
      },
      {
        source: "/api/updateUserInfo",
        destination: "https://dev-branch-server.herokuapp.com/api/updateUserInfo",
      },
      {
        source: "/api/getUserInfo",
        destination: "https://dev-branch-server.herokuapp.com/api/getUserInfo",
      },
      {
        source: "/api/getUserBids/:user",
        destination: "https://dev-branch-server.herokuapp.com/api/getUserBids/:user",
      },
      {
        source: "/api/deleteBid/:bidId",
        destination: "https://dev-branch-server.herokuapp.com/api/deleteBid/:bidId",
      },
      /*{
        source: "/api/getBid/:bidId",
        destination: "https://dev-branch-server.herokuapp.com/api/getBid/:bidId",
      }*/
    ];
  },
};
