const jwt = require('jsonwebtoken');
const { userServices } = require('./../databaseServices');

const userIsUser = async (userId, token) => {
  let result = { loggedIn: false };

  if (!token) {
    throw new Error('Unauthorized Access');
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    result.loggedIn = true;
    result.user = decodedToken.id;

    if (result.user !== userId) {
      throw new Error('Unauthorized Access');
    }

    const user = await userServices.findUserById(decodedToken.id);

    if (!user || user.id !== decodedToken.id) {
      throw new Error('Unauthorized Access');
    }

    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error('Unauthorized Access');
  }
};

const userIsUserMiddleware = async (req, res, next) => {
  let userId = req.body.userId;

  if (!userId) {
    // amazing code, everyone is using different names for userId so it was the easiest fix
    userId = req.params.userId;
    if (!userId) {
      userId = req.params.id;
    }
    if (!userId) {
      userId = req.params.user;
    }
    if (!userId) {
      userId = req.body.user;
    }
  }

  const token = req.cookies.jwt;

  try {
    const result = await userIsUser(userId, token);
    // User is authenticated and result object is available
    req.user = result.user;
    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    // Handle unauthorized access error
    console.log(err.message);
    res.status(401).send('Unauthorized Access');
  }
};

module.exports = {
  userIsUserMiddleware,
};
