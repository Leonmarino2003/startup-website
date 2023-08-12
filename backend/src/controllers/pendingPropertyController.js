const express = require('express');

const exceptionsManager = require('../globalErrorHandler/exceptionsManager');
const { mailer } = require('../utility/emailservice');

const {
  propertyServices,
  userServices,
  pendingPropertyServices,
} = require('./../databaseServices');

const pendingPropertyController = {};

pendingPropertyController.registerPendingProperty = async (req, res, next) => {
  const response = {};
  const user = req.body.userId;
  const address = req.body.address;

  // Find user
  const foundUser = await userServices.findUserById(user);
  // Find or create property
  let property = await propertyServices.findOrCreateProperty(address);
  console.log(property);
  // Check if user already has a pending property with this address
  const foundPendingProperty = await pendingPropertyServices.findBy({
    userId: foundUser.id,
    propertyId: property.id,
  });
  console.log(foundPendingProperty);
  if (foundPendingProperty)
    throw new exceptionsManager.PendingPropertyAlreadyExists(
      'The property is already pending for this user'
    );
  // Create pending property
  const createdPendingProperty =
    await pendingPropertyServices.createPendingProperty(
      foundUser.id,
      property.id
    );
  // Send mail
  mailer.registerPendingProperty(foundUser.email, property.address);

  response.msg = 'Saved pending property to the database';
  response.success = true;
  response.pendingPropertyId = createdPendingProperty.id;
  return res.status(201).send(response);
};

pendingPropertyController.getAllPendingPropertiesByUserId = async (
  req,
  res,
  next
) => {
  const response = {};
  const userId = req.params.userId;

  const foundUser = await userServices.findUserById(userId);
  const foundPendingProperties =
    await pendingPropertyServices.findAllPendingPropertiesByUserId(
      foundUser.id
    );

  response.success = true;
  response.pendingProperties = foundPendingProperties;
  return res.status(200).send(response);
};

pendingPropertyController.getPendingPropertyById = async (req, res, next) => {
  const response = {};
  const id = req.params.propertyId;

  const foundPendingProperty =
    await pendingPropertyServices.findPendingPropertyById(id);

  response.msg = 'Found a pending property in the database';
  response.success = true;
  response.pendingProperty = foundPendingProperty;
  return res.status(200).send(response);
};

pendingPropertyController.getAllPendingProperties = async (req, res, next) => {
  const response = {};

  const result = await pendingPropertyServices.findAllPendingProperties();
  console.log(result);
  response.msg = 'Found all pending properties in the database';
  response.success = true;
  response.pendingProperties = result;
  return res.status(200).send(response);
};

pendingPropertyController.getAllPendingPropertiesByPropertyId = async (
  req,
  res,
  next
) => {
  const response = {};
  const propertyId = req.params.propertyId;

  const foundPendingProperties =
    await pendingPropertyServices.findAllPendingPropertiesByPropertyId(
      propertyId
    );

  response.msg = 'Found pending properties in the database';
  response.success = true;
  response.pendingProperties = foundPendingProperties;
  return res.status(200).send(response);
};

pendingPropertyController.deletePendingPropertyById = async (
  req,
  res,
  next
) => {
  const response = {};
  const propertyId = req.params.propertyId;

  const deleted = await pendingPropertyServices.deletePendingPropertyById(
    propertyId
  );

  response.msg = 'Deleted pending property from the database';
  response.success = true;
  return res.status(200).send(response);
};

module.exports = pendingPropertyController;
