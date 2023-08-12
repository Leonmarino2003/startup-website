require('dotenv').config();

const { userServices } = require('./../databaseServices');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('./../utility/utils');

const authenticationController = {};

authenticationController.login = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const loginPass = req.body.password;
  try {
    const foundUser = await userServices.findUserByEmail(email);
    const isMatch = await comparePassword(loginPass, foundUser.password);
    const userId = foundUser._id;
    const userIdString = userId.toString();
    if (foundUser.role === 'banned' && foundUser.Role === 'suspended') {
      console.log('User is banned or suspended.');
      res
        .status(400)
        .json({ message: 'User is banned or suspended', status: false });
    }
    if (
      isMatch &&
      foundUser.role != 'banned' &&
      isMatch &&
      foundUser.role != 'suspended'
    ) {
      // Create jsonwebtoken
      const token = jwt.sign({ id: userIdString }, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });
      // Success response with jwt cookie
      res
        .status(202)
        .cookie('jwt', token)
        .json({ message: 'Login success!', status: true, id: userIdString });
      console.log('Welcome ', foundUser.email);
    } else if (!isMatch) {
      console.log('IS NOT MATCH');
      res
        .status(400)
        .json({ message: 'Wrong password, please try again', status: false });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

authenticationController.loggedin = (req, res) => {
  let result = { loggedIn: false, user: 'none' };
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Decoded token:', decodedToken);
        result.loggedIn = true;
        result.user = decodedToken.id;
      }
    });
  }

  res.json(result);
};

module.exports = authenticationController;
