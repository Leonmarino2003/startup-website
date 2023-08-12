const Property = require('./property');

const findById = async (id) => await Property.findById(id);

const findByAddress = async (address) =>
  await Property.findOne({ address: address });

const findByMultipleIds = async (ids) =>
  await Property.find({ _id: { $in: ids } });

const findMany = async (searchCriteria) => await Property.find(searchCriteria);

async function deleteAll(address) {
  return await Property.deleteMany({
    address: address,
  });
}

async function deleteById(id) {
  return await Property.deleteOne({
    _id: id,
  });
}

async function deleteByAddressAndOwner(address, ownerId) {
  return await Property.deleteMany({
    address: address,
    owner: ownerId,
  });
}

async function findAllWithAddress(address) {
  return await Property.find({
    address: address,
  });
}

module.exports = propertyQueries = {
  findById,
  findByAddress,
  findByMultipleIds,
  findMany,
  deleteAll,
  deleteByAddressAndOwner,
  findAllWithAddress,
  deleteById,
};
