const adminRouter = require('./adminRoutes');
const pendingPropertyRouter = require('./pendingPropertyRoutes');
const propertyRouter = require('./propertyRoutes');
const signUpRouter = require('./signupRoutes');
const plotLinesRouter = require('./plotLinesRoutes');
const authenticationRouter = require('./authenticationRoutes');
const userRouter = require('./userRoutes');
const resetRouter = require('./resetRoutes');
const bidRouter = require('./bidRoutes');
const feedbackRouter = require('./feedbackRoutes');

module.exports = {
  adminRouter,
  pendingPropertyRouter,
  propertyRouter,
  signUpRouter,
  plotLinesRouter,
  authenticationRouter,
  userRouter,
  resetRouter,
  bidRouter,
  feedbackRouter,
};
