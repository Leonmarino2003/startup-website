if (!process.env.NODE_ENV) {
  require('dotenv').config();
}

const {
  adminRouter,
  pendingPropertyRouter,
  propertyRouter,
  signUpRouter,
  plotLinesRouter,
  bidRouter,
  userRouter,
  resetRouter,
  authenticationRouter,
  feedbackRouter,
} = require('./routes');

const mongoose = require('mongoose');
const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();
const errorHandler = require('./globalErrorHandler/errorHandler');
const expressSession = require('express-session');

mongoose.connect(process.env.DEV_DATABASE_URL || process.env.DATABASE_URL); // Connect to dev database, OR production database.

const db = mongoose.connection;

const passport = require('passport');

db.on('error', (error) => console.error(error));
db.once('open', async () => {
  console.log('Connected to ' + db.name);
});

app.use(cookieparser());
app.use(
  expressSession({
    secret: 'topsecret',
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', adminRouter);

app.use('/api', pendingPropertyRouter);

app.use('/api', propertyRouter);

app.use('/api', plotLinesRouter);

app.use('/api', bidRouter);

app.use('/api', userRouter);

app.use('/api', resetRouter);

app.use('/api', authenticationRouter);

app.use('/api', feedbackRouter);

app.use('/api', signUpRouter);

app.use(errorHandler); // THIS ONE MUST ALWAYS BE LAST .USE IN THE FILE

app.listen(process.env.PORT || 3000, () =>
  console.log('Server running on 3000')
);
