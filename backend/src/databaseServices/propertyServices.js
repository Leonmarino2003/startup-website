const Property = require('./property/property');

const propertyQueries = require('./property/propertyQueries');
const userQueries = require('./user/userQueries');
const exceptionsManager = require('../globalErrorHandler/exceptionsManager');
const mailer = require('../utility/emailservice');

async function validateProperty(property) {
  try {
    await Property.validate(property);
  } catch (e) {
    throw new exceptionsManager.BadRequest(e.message);
  }
}

const findPropertyById = async (id) => propertyQueries.findById(id);

/**
 * Attemps to find property by address
 * @param {Object} address
 * @returns {Object} The found property
 * @throws {NotFound} If the property is not found
 */
async function findPropertyByAddress(address) {
  const property = await propertyQueries.findByAddress(address);
  if (!property) throw new exceptionsManager.NotFound('Property not found');
  return property;
}

/**
 * Finds or creates a property and sets the owner
 */
async function createOrFindPropertyAndSetOwner(owner, address, premiumInfo) {
  const foundUser = await userQueries.findById(owner);
  if (!foundUser) throw new exceptionsManager.NotFound('User not found');

  const existingProperty = await propertyQueries.findByAddress(address);
  let createdProperty;
  if (!existingProperty)
    createdProperty = await createProperty(address, premiumInfo);

  await propertyQueries.deleteByAddressAndOwner(address, foundUser._id);
  const savedProperty = await setPropertyOwner(
    foundUser._id,
    existingProperty ? existingProperty._id : createdProperty._id
  );
  mailer.pendingPropertyApproved(foundUser.email, savedProperty.address);
  return savedProperty;
}
/**
 * Attemps to find or create a property
 */
async function findOrCreateProperty(address) {
  let property = await propertyQueries.findByAddress(address);
  if (!property) property = await createProperty(address);
  return property;
}

async function deleteAllDuplicates() {
  const properties = await propertyQueries.findMany({});
  const uniqueProperties = [];
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    if (!uniqueProperties.includes(property.address.street)) {
      uniqueProperties.push(property.address.street);
    } else {
      await propertyQueries.deleteById(property._id);
    }
  }
}

/**
 * Attemps to create a property
 */
async function createProperty(address, premiumInfo) {
  const property = new Property({
    address: address,
    premiumInfo: premiumInfo,
  });

  await validateProperty(property);
  const createdProperty = await property.save();
  return createdProperty;
}

async function setPropertyOwner(ownerId, propertyId) {
  Property.findOneAndUpdate(
    { _id: propertyId },
    { owner: ownerId },
    null,
  ).then(data =>  console.log(data))
  .catch(error => console.log(error));
  return true;
}

async function findUserFavorites(userId) {
  const user = await userQueries.findById(userId);
  if (!user) throw new exceptionsManager.NotFound('User not found');

  const properties = await propertyQueries.findByMultipleIds(
    user.favoriteProperties
  );
  return properties;
}

async function addFavoriteProperty(userId, address) {
  let property = await propertyQueries.findByAddress(address);
  if (!property) property = await createProperty(address, null);

  let user = await userQueries.findById(userId);
  if (!user) throw new exceptionsManager.NotFound('User not found');

  if (user.favoriteProperties.includes(property._id))
    throw new exceptionsManager.AlreadyExists(
      'Property is already in favorites'
    );

  // Add property to user's favorites
  user = await userQueries.addFavoriteProperty(userId, property._id);

  if (!user.favoriteProperties.includes(property._id))
    throw new exceptionsManager.BadRequest('Property not added to favorites');
  return property;
}

async function removeFavoriteProperty(userId, propertyId) {
  const property = await propertyQueries.findById(propertyId);
  if (!property) throw new exceptionsManager.NotFound('Property not found');

  let user = await userQueries.findById(userId);
  if (!user) throw new exceptionsManager.NotFound('User not found');

  if (!user.favoriteProperties.includes(property._id))
    throw new exceptionsManager.NotFound('Property is not in favorites');

  // Remove property from user's favorites
  user = await userQueries.removeFavoriteProperty(userId, property._id);

  if (user.favoriteProperties.includes(property._id))
    throw new exceptionsManager.BadRequest(
      'Property not removed from favorites'
    );
  return property;
}

async function isFavoriteProperty(userId, propertyId) {
  const user = await userQueries.findById(userId);
  if (!user) throw new exceptionsManager.NotFound('User not found');

  if (!user.favoriteProperties.includes(propertyId)) return false;

  return true;
}

async function findOwner(owner) {
  const foundOwner = await Property.find({ owner: owner });
  if (!foundOwner) {
    return null;
  } else {
    return foundOwner;
  }
}

async function findPlot(plotData) {
  const foundPlot = await Property.findOne({ address: plotData });
  if (!foundPlot) {
    console.log('No plot found');
    return null;
  } else {
    return foundPlot;
  }
}

async function findPropertyAndAddBid(bid, foundPendingBid) {
  try {
    const docs = await Property.findOneAndUpdate(
      { address: bid.address },
      { $push: { bids: foundPendingBid } },
      { returnDocument: 'true' }
    );
    if (!docs) return;
    return docs;
  } catch (err) {
    return err;
  }
}

async function addDescription(reqProperty, desc) {
  try {
    Property.findOneAndUpdate(
      { address: reqProperty },
      { description: desc },
      null,
    ).then(data =>  console.log(data))
    .catch(error => console.log(error));
    return true;
  } catch (err) {
    console.log('Error:', err);
    return false;
  }
}

async function addViewAndClick(property) {
  let result = {};

  try {
    const docs = await Property.findOneAndUpdate(
      { _id: new ObjectId(`${property.id}`) },
      {
        $inc: { 'stats.clickViews': 1 },
      }
    );
    if (docs) {
      result.success = true;
      result.propId = docs._id;
    } else {
      result.success = false;
      result.msg = docs;
    }

    return result;
  } catch (err) {
    console.log(err);
    result.success = false;
    result.msg = err;
    return result;
  }
}

async function findManyPropertiesByPostCode(postcode) {
  const newPostCode = postcode.slice(1, postcode.length);

  try {
    const properties = await Property.find().where({
      'address.postcode': newPostCode,
    });

    if (!properties) {
      console.log('No properties found!');
      return null;
    }
    return properties;
  } catch (e) {
    console.log('Error finding a property', e);
    return null;
  }
}

async function addViewsToPostCode(property) {
  let result = {};

  try {
    const docs = await Property.findOneAndUpdate(
      { _id: new ObjectId(`${property.id}`) },
      {
        $inc: { 'stats.views': 1 },
      }
    );
    if (docs) {
      result.success = true;
      result.propId = docs._id;
    } else {
      result.success = false;
      result.msg = docs;
    }

    return result;
  } catch (err) {
    console.log(err);
    result.success = false;
    result.msg = err;
    return result;
  }
}

module.exports = propertyService = {
  findPropertyByAddress,
  findPropertyById,
  createOrFindPropertyAndSetOwner,
  findUserFavorites,
  addFavoriteProperty,
  removeFavoriteProperty,
  isFavoriteProperty,
  findOwner,
  findPlot,
  findPropertyAndAddBid,
  addDescription,
  addViewAndClick,
  findManyPropertiesByPostCode,
  addViewsToPostCode,
  createProperty,
  findOrCreateProperty,
  setPropertyOwner,
  deleteAllDuplicates,
};
