import { async } from "@firebase/util";

export async function sendRectangleBounds(body) {
  const response = await fetch("/api/plotlines/rendered", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function giveFeedback(body) {
  const response = await fetch("/api/postFeedback", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function createAccount(body, isUserCreatedPassword) {
  const userObj = {
    body,
    isUserCreatedPassword
  }
  const response = await fetch("/api/signUp", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function placeBidInDB(body) {
  try {
    const response = await fetch("/api/postBid", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    /* if (!response.ok) {
      throw new Error(`Error placing bid in DB, status: ${response.status}`);
    }
    return await response.json(); */
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function unsuspendOrUnbanUser(user) {
  const response = await fetch(`/api/unsuspendOrUnbanUser/${user}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  const data = await response.json();
  return data;
}

// Place pending bid in database
export async function placePendingBidInDB(body) {
  const response = await fetch("/api/postPendingBid", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(response);
  return data;
}

export async function getBiddersFromDb() {
  const response = await fetch(`/api/properties/bids`);
  const data = await response.json();
  return data;
}

export async function placeAnonBidInDB(body) {
  const response = await fetch("/api/anonBid", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

// Login step 3 - Login info is sent to the API route
export async function loginFetch(body) {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function changePassFetch(body) {
  const response = await fetch("/api/changePass", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getUserInfo() {
  const response = await fetch(`https://dev-branch-server.herokuapp.com/api/getUserInfo`);
  const data = await response.json();
  return data;
}

export async function fetchUser(user) {
  const response = await fetch(`/api/getUser/${user}`);
  const data = await response.json();
  return data;
}

export async function getUser(user) {
  const response = await fetch(`/api/adminGetUser/${user}`);
  const data = await response.json();
  return data;
}

export async function registerPropertyOwner(body) {
  try {
    const response = await fetch("/api/admin/registerPropertyOwner", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function fetchOwnerProperties(user) {
  const response = await fetch(`/api/getOwnerProperties/${user}`);
  const data = await response.json();
  return data;
}

export async function saveFavoriteProperty(body) {
  try {
    const response = await fetch("/api/saveFavoriteProperty", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function removeFavoriteProperty(body) {
  try {
    const response = await fetch("/api/removeFavoriteProperty", {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function isFavoriteProperty(body) {
  const response = await fetch("/api/isFavoriteProperty", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getFavoriteProperties(user) {
  const response = await fetch(`/api/getFavoriteProperties/${user}`);
  const data = await response.json();
  return data;
}

export async function changePassword(body) {
  const response = await fetch("/api/changePass", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function saveNotificationsInDB(userObj) {
  const response = await fetch("/api/saveNotifications", {
    method: "PUT",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getNotificationsFromDB(user) {
  const response = await fetch(`/api/getNotifications/${user}`);
  const data = await response.json();
  return data;
}

export async function updateUserInfoInDB(userInfo) {
  // console.log("HELLOOO YO YOOOO")
  const response = await fetch("/api/updateUserInfo", {
    method: "POST",
    body: JSON.stringify({ userInfo }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function saveNameInDB(userObj) {
  const response = await fetch("/api/saveName", {
    method: "PUT",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getNameFromDB(user) {
  const response = await fetch(`/api/getName/${user}`);
  const data = await response.json();
  return data;
}

export async function saveBirthDateInDB(userObj) {
  const response = await fetch("/api/saveBirthDate", {
    method: "PUT",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getBirthDateFromDB(user) {
  const response = await fetch(`/api/getBirthDate/${user}`);
  const data = await response.json();
  return data;
}

export async function saveGenderInDB(userObj) {
  const response = await fetch("/api/saveGender", {
    method: "PUT",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getGenderFromDB(user) {
  const response = await fetch(`/api/getGender/${user}`);
  const data = await response.json();
  return data;
}

//Added function to get and save Address in DB
export async function saveAddressInDB(userObj) {
  const response = await fetch("/api/saveAddress", {
    method: "PUT",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getAddressFromDB(user) {
  const response = await fetch(`/api/getAddress/${user}`);
  const data = await response.json();
  return data;
}

export async function savePhoneNumberInDB(userObj) {
  const response = await fetch("/api/savePhoneNumber", {
    method: "PUT",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getPhoneNumberFromDB(user) {
  const response = await fetch(`/api/getPhoneNumber/${user}`);
  const data = await response.json();
  return data;
}

export async function saveEmailInDB(userObj) {
  const response = await fetch("/api/saveEmail", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getEmailFromDB(user) {
  const response = await fetch(`/api/getEmail/${user}`);
  const data = await response.json();
  return data;
}

export async function saveImageToDB(url, user) {
  const imageObj = {
    url,
    user,
  };

  const response = await fetch("/api/saveImageURL", {
    method: "POST",
    body: JSON.stringify(imageObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function deleteImageFromDB(user) {
  const userObj = {
    user,
  };
  const response = await fetch("/api/deleteImage", {
    method: "DELETE",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getImageFromDB(user) {
  const response = await fetch(`/api/getProfileImage/${user}`);
  const data = await response.json();
  return data;
}

export async function addDescription(body) {
  const response = await fetch("/api/addDescription", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function answerBid(body) {
  const response = await fetch("/api/answerBid", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function saveOwnerDocToDB(url, user, propertyId) {
  const docObj = {
    url,
    user,
    propertyId,
  };

  const response = await fetch("/api/saveDocURL", {
    method: "POST",
    body: JSON.stringify(docObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function verifyJWT() {
  try {
    const response = await fetch(`https://dev-branch-server.herokuapp.com/api/loggedin`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during verifyJWT:", error);
  }
}


export async function getAllUsers() {
  const response = await fetch(`/api/getAllUsers`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getAllDeniedBids() {
  const response = await fetch(`/api/getAllDeniedBids`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getAllUsersWhoIsInProgram() {
  const response = await fetch(`/api/userWhoIsInBidGuideProgram`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getAllBids() {
  const response = await fetch("/api/getAllBids", {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

// Pending bid - get all pending bids
export async function getAllPendingBids() {
  const response = await fetch("/api/getAllPendingBids", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

// All bids accepted by admin - get all bids accepted by admin
export async function getAllBidsAcceptedByAdmin() {
  const response = await fetch("/api/getAllBidsAcceptedByAdmin", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function resetPassword(body) {
  const response = await fetch(`/api/reset/password`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function createPasswordResetCode(body) {
  const response = await fetch(`/api/reset/password/new`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response)

  const data = await response.json();
  return data;
}

export async function registerPendingProperty(body) {
  try {
    const response = await fetch("/api/registerPendingProperty", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getAllPendingPropertiesByUserId(userId) {
  const response = await fetch(
    `/api/getAllPendingPropertiesByUserId/${userId}`
  );
  const data = await response.json();
  return data;
}

export async function getAllPendingPropertiesByPropertyId(propertyId) {
  const response = await fetch(
    `/api/getAllPendingPropertiesByPropertyId/${propertyId}`
  );
  const data = await response.json();
  return data;
}

export async function getPendingPropertyById(pendingPropertyId) {
  const response = await fetch(
    `/api/getPendingPropertyById/${pendingPropertyId}`
  );
  const data = await response.json();
  return data;
}

export async function findAllPendingProperties() {
  const response = await fetch(`/api/getAllPendingProperties`);
  const data = await response.json();
  return data;
}

export async function deletePendingPropertyById(pendingPropertyId) {
  const response = await fetch(
    `/api/deletePendingPropertyById/${pendingPropertyId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
}

export async function denyPendingPropertyById(pendingPropertyId) {
  const response = await fetch(
    `/api/admin/deletePendingPropertyById/${pendingPropertyId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
}

export async function addView(propertyAddress) {
  const response = await fetch(
    `/api/addView/:${propertyAddress.street}&:${propertyAddress.city}&:${propertyAddress.postcode}`,
    {
      method: "PUT",
      body: JSON.stringify(propertyAddress),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

//Body
//{"email" "password" "confirmationCode"}
export async function confirmSignup(body) {
  const response = await fetch("/api/confirmSignup", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getRole(user) {
  const response = await fetch(`/api/getRole/${user}`, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

export async function banUser(user, message) {
  const response = await fetch(`/api/blockUser/${user}&:${message}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function warnUser(user, message) {
  const response = await fetch(`/api/warnUser/${user}&:${message}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function deletePendingBidById(id) {
  const response = await fetch(`/api/denyPendingBid/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete pending bid with id ${id}`);
  }

  return response.json();
}

export async function confirmPendingBidById(id) {
  const response = await fetch(`/api/confirmPendingBid/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`Failed to confirm pending bid with id ${id}`);
  }

  return response.json();
}


export async function updateBidStatuses(id, updateData) {
  try {
    const response = await fetch(`/api/updateBidStatuses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error(`Failed to confirm pending bid with id ${id}`);
    }
    const responseData = await response.json();
    //console.log("Response Data:", responseData);
    if (!responseData) {
      console.error(`Empty response data received for bid with id ${id}`);
      return null;
    }

    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to update pending bid status: ${error}`);
  }
}


export async function updateOwnerViaEmail(user, message) {
  const response = await fetch(
    `/api/presentPendingBidToOwner/${user}&:${message}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function getUserBidRecords(user) {
  const response = await fetch(`/api/getTotalBids/${user}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getUserBids(user) {
  const response = await fetch(`/api/getUserBids/${user}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}
export async function getBannedUsers() {
  const response = await fetch(`/api/getBannedUsers`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function deleteBidAndAddInDeniedBids(id, body) {
  const response = await fetch(`/api/deleteBid/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  const data = await response.json();
  return data; 
}


/*export async function getBidById(id) {
  try {
    const response = await fetch(`/api/getBid/${id}`, {
      method: "GET",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch bid with id ${id}`);
    }
    const responseData = await response.json();
    console.log("Response Data:", responseData);
    if (!responseData) {
      console.error(`Empty response data received for bid with id ${id}`);
      return null;
    }
    return responseData;
  } catch (error) {
    console.error(`Failed : ${error}`);
    throw new Error(`Failed to fetch bid: ${error}`);
  }
}*/



