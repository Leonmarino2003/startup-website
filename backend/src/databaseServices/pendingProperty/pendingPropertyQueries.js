const PendingProperty = require('./pendingProperty');

const deleteById = async (id) => PendingProperty.findOneAndDelete({ _id: id });

const findBy = async (searchCriteria) =>
  await PendingProperty.findOne(searchCriteria);

const findMany = async (searchCriteria) =>
  await PendingProperty.find(searchCriteria);

const findById = async (id) => await PendingProperty.findById(id);

module.exports = pendingPropertyQueries = {
  deleteById,
  findBy,
  findMany,
  findById,
};
