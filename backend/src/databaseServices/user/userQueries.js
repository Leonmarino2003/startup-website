const User = require('./user');

const findById = async (id) => await User.findById(id);

const findByEmail = async (email) => await User.findOne({ email });

const getAll = async () => await User.find();

const getFavoritePropertyIds = async (id) =>
  await User.findOne({ _id: userId }, { favoriteProperties: 1, _id: 0 });

const addFavoriteProperty = async (userId, propertyId) => {
  user = await User.findById(userId);
  user.favoriteProperties.push(propertyId);
  await user.save();

  return user;
};

const removeFavoriteProperty = async (userId, propertyId) => {
  const user = await User.findById(userId);
  const index = user.favoriteProperties.indexOf(propertyId);
  if (index !== -1) {
    user.favoriteProperties.splice(index, 1);
  }
  await user.save();

  return user;
};

const setVerifiedEmail = async (user, verifiedEmail) => {
  user.verifiedEmail = verifiedEmail;
  await user.save();

  return user;
};

module.exports = userQueries = {
  findById,
  findByEmail,
  getAll,
  getFavoritePropertyIds,
  addFavoriteProperty,
  removeFavoriteProperty,
  setVerifiedEmail,
};
