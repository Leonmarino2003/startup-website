const pendingPropertyQueries = require('./pendingProperty/pendingPropertyQueries');
const propertyQueries = require('./property/propertyQueries');
const userQueries = require('./user/userQueries');
const PendingProperty = require('./pendingProperty/pendingProperty');
const exceptionsManager = require('../globalErrorHandler/exceptionsManager');
const ObjectId = require('mongoose').Types.ObjectId;

const createPendingProperty = async (ownerId, propertyId) => {
  const pendingProperty = new PendingProperty({
    userId: ownerId,
    propertyId: propertyId,
  });

  await validatePendingProperty(pendingProperty);

  const createdPendingProperty = await pendingProperty.save();
  return createdPendingProperty;
};

async function validatePendingProperty(pendingProperty) {
  try {
    await PendingProperty.validate(pendingProperty);
  } catch (e) {
    throw new exceptionsManager.BadRequest(e.message);
  }
}

async function findBy(searchCriteria) {
  const pendingProperty = await pendingPropertyQueries.findBy(searchCriteria);
  return pendingProperty;
}

async function findMany(searchCriteria) {
  const pendingProperties = await pendingPropertyQueries.findMany(
    searchCriteria
  );
  return pendingProperties;
}

async function findAllPendingPropertiesByUserId(userId) {
  const foundPendingProperties = await pendingPropertyQueries.findMany({
    userId: userId,
  });
  let pendingPropertyDTOs = [];
  for (let i = 0; i < foundPendingProperties.length; i++) {
    const pendingProperty = foundPendingProperties[i];
    console.log(pendingProperty);
    const user = await userQueries.findById(pendingProperty.userId);
    const property = await propertyQueries.findById(pendingProperty.propertyId);
    const pendingPropertyDTO = await _formatPendingPropertyDTO(
      pendingProperty,
      property,
      user
    );
    pendingPropertyDTOs.push(pendingPropertyDTO);
  }
  return pendingPropertyDTOs;
}

async function findAllPendingPropertiesByPropertyId(propertyId) {
  const property = await propertyQueries.findById(propertyId);
  if (!property) throw new exceptionsManager.NotFound('Property not found');
  const foundPendingProperties = await pendingPropertyQueries.findMany({
    propertyId: property._id,
  });

  let pendingPropertyDTOs = [];
  for (let i = 0; i < foundPendingProperties.length; i++) {
    const pendingProperty = foundPendingProperties[i];
    const user = await userQueries.findById(pendingProperty.userId);
    const pendingPropertyDTO = await _formatPendingPropertyDTO(
      pendingProperty,
      property,
      user
    );
    pendingPropertyDTOs.push(pendingPropertyDTO);
  }
  return pendingPropertyDTOs;
}

async function findAllPendingProperties() {
  const pendingProperties = await pendingPropertyQueries.findMany();
  let pendingPropertyDTOs = [];
  for (let i = 0; i < pendingProperties.length; i++) {
    const pendingProperty = pendingProperties[i];
    const user = await userQueries.findById(pendingProperty.userId);
    const property = await propertyQueries.findById(pendingProperty.propertyId);
    if (!property || !user) break;
    const pendingPropertyDTO = await _formatPendingPropertyDTO(
      pendingProperty,
      property,
      user
    );
    pendingPropertyDTOs.push(pendingPropertyDTO);
  }
  return pendingPropertyDTOs;
}

async function findPendingPropertyById(id) {
  console.log(id);
  if (!ObjectId.isValid(id))
    throw new exceptionsManager.InvalidObjectId(
      'Invalid pendingProperty ObjectId'
    );
  const foundProperty = await pendingPropertyQueries.findById(id);
  if (!foundProperty)
    throw new exceptionsManager.NotFound('Pending property not found');

  return foundProperty;
}

async function deletePendingPropertyById(id) {
  if (!ObjectId.isValid(id))
    throw new exceptionsManager.InvalidObjectId(
      'Invalid pendingProperty ObjectId'
    );

  const deleted = await pendingPropertyQueries.deleteById(id);
  if (!deleted)
    throw new exceptionsManager.NotFound('Pending property not found');

  return deleted;
}

module.exports = pendingPropertyServices = {
  createPendingProperty,
  findBy,
  findMany,
  findPendingPropertyById,
  deletePendingPropertyById,
  findAllPendingPropertiesByUserId,
  findAllPendingPropertiesByPropertyId,
  findAllPendingProperties,
};

async function _formatPendingPropertyDTO(pendingProperty, property, user) {
  return {
    pendingProperty: {
      creationDate: pendingProperty.creationDate,
      id: pendingProperty._id,
    },
    property: {
      id: property._id,
      address: property.address,
    },
    user: {
      id: user._id,
      email: user.email,
    },
  };
}
