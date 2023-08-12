const {
  propertyServices,
  pendingPropertyServices,
} = require('./../databaseServices');

const mailer = require('../utility/emailservice');

const propertyController = {};

propertyController.registerPropertyOwner = async (req, res, next) => {
  const response = {};
  const pendingPropertyId = req.body.pendingPropertyId;
  const userId = req.body.userId;

  const foundUser = await userServices.findUserById(userId);
  const foundPendingProperty =
    await pendingPropertyServices.findPendingPropertyById(pendingPropertyId);
  const property = await propertyServices.findPropertyById(
    foundPendingProperty.propertyId
  );

  // Set property owner and delete pending property and send mail
  await propertyServices.setPropertyOwner(
    foundUser._id,
    foundPendingProperty.propertyId
  );
  await pendingPropertyServices.deletePendingPropertyById(
    foundPendingProperty.id
  );
  mailer.pendingPropertyApproved(foundUser.email, property.address);

  // Deny remaining pending properties for the same property
  const pendingProperties = await pendingPropertyServices.findMany({
    propertyId: foundPendingProperty.propertyId,
  });
  pendingProperties.forEach(async (pendingProperty) => {
    try {
      await pendingPropertyServices.deletePendingPropertyById(
        pendingProperty.id
      );
      mailer.pendingPropertyDenied(foundUser.email, property._id);
    } catch (e) {}
  });

  //Success
  response.success = true;
  response.msg = 'The property owner was registered';
  return res.status(201).send(response);
};

propertyController.getFavoriteProperties = async (req, res, next) => {
  const response = { success: false };
  const userId = req.params.user;
  if (!userId) return res.status(400).send('No user id provided');

  const favoriteProperties = await propertyServices.findUserFavorites(userId);

  //Success
  response.success = true;
  response.msg = "The user's favorite properties were found";
  response.favoriteProperties = favoriteProperties;
  return res.status(200).send(response);
};

propertyController.saveFavoriteProperty = async (req, res, next) => {
  const response = { success: false };
  const userId = req.body.user;
  const address = req.body.address;

  const savedFavoriteProperty = await propertyServices.addFavoriteProperty(
    userId,
    address
  );

  //Success
  response.success = true;
  response.msg = "The property was added to the user's favorites";
  response.savedFavoriteProperty = savedFavoriteProperty;
  return res.status(201).send(response);
};

propertyController.removeFavoriteProperty = async (req, res, next) => {
  const response = { success: false };
  const userId = req.body.user;
  const address = req.body.address;

  const property = await propertyServices.findPropertyByAddress(address);
  const removedFavoriteProperty = await propertyServices.removeFavoriteProperty(
    userId,
    property._id
  );

  //Success
  response.success = true;
  response.msg = "The property was removed from the user's favorites";
  response.removedFavoriteProperty = removedFavoriteProperty;
  return res.status(200).send(response);
};

propertyController.isFavoriteProperty = async (req, res, next) => {
  const response = { success: false };

  const userId = req.body.user;
  const address = req.body.address;

  const property = await propertyServices.findPropertyByAddress(address);
  const isFavoriteProperty = await propertyServices.isFavoriteProperty(
    userId,
    property._id
  );

  //Success
  response.success = true;
  response.msg = 'Checked if the property is a favorite property';
  response.isFavoriteProperty = isFavoriteProperty;
  return res.status(200).send(response);
};

propertyController.addDescription = async (req, res) => {
  const response = {};
  const plotObj = req.body.address;
  const desc = req.body.description;
  const addedDesc = await propertyServices.addDescription(plotObj, desc);
  if (addedDesc) {
    response.success = true;
    response.msg = 'Succefully added description to database';
  } else {
    response.success = true;
    response.msg = 'Could not add description to database';
  }
  res.json(response);
};

propertyController.addView = async (req, res) => {
  const response = {};
  const property = req.params.propertyAddress;
  const city = req.params.city;
  const postcode = req.params.postcode;
  try {
    const findProperty = await propertyServices.findPropertyByAddress(
      property,
      city
    );

    if (findProperty === null) {
      response.success = false;
      response.msg = 'Couldnt find the property in the database';
      res.status(200);
      res.json(response);
      return;
    } else if (findProperty) {
      await propertyServices.addViewAndClick(findProperty);
      response.success = true;
      response.msg = 'Property updated successfuly!';
    } else {
      response.success = false;
      response.msg = 'No property found.';
    }
    const manyProperties = await propertyServices.findManyPropertiesByPostCode(
      postcode
    );

    if (manyProperties != null) {
      manyProperties.forEach((element) => {
        propertyServices.addViewsToPostCode(element);
      });
      response.success = true;
      response.msg = 'Properties updated successfuly!';
    } else {
      response.success = false;
      response.msg = 'No properties found.';
    }

    res.json(response);
  } catch (err) {
    response.success = false;
    response.msg = err;
    res.json(response);
  }
};

module.exports = propertyController;
