const jwt = require('jsonwebtoken');
const { userServices } = require('./../databaseServices');

const isAdmin = (req, res, next) => {
  let result = { loggedIn: false, user: 'none', isAdmin: false };
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return next(err);
      } else {
        // console.log(decodedToken);
        result.loggedIn = true;
        result.user = decodedToken.id;
        const user = await userServices.findUserById(decodedToken.id);

        if (user.err) {
          console.log(err.message);
          return next(err);
        }
        if (user.role === 'admin') {
          result.isAdmin = true;
          next();
        } else {
          return next(new Error('Unauthorized Access'));
        }
      }
    });
  } else {
    return next(new Error('Unauthorized Access'));
  }
};

const isNotBlocked = (req, res, next) => {
  let result = { loggedIn: false, user: 'none', isAdmin: false };
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return next(err);
      } else {
        console.log('Decoded token:', decodedToken);
        result.loggedIn = true;
        result.user = decodedToken.id;
        User.findById(decodedToken.id, (err, user) => {
          if (err) {
            console.log(err.message);
            return next(err);
          }
          if (!user.role === 'blocked') {
            result.isAdmin = true;
            next();
          } else {
            return next(new Error('User is banned.'));
          }
        });
      }
    });
  } else {
    return next(new Error('Unauthorized Access'));
  }
};

module.exports = {
  isAdmin,
  isNotBlocked,
};
