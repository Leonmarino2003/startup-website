const mongoose = require('mongoose');
const emailservice = require('../../utility/emailservice');
const { Schema } = mongoose;

const birthDateSchema = new Schema({
  birthDay: { type: Number },
  birthMonth: { type: Number },
  birthYear: { type: Number },
  required: Boolean,
});

// Standard code schema
const hashedCode = Schema({
  code: { type: String, required: true },
  validUntil: { type: Date, required: true },
});

// Add codes here, email verification code, password reset code, etc.
const codes = Schema({
  emailVerificationCode: { type: hashedCode },
  passwordResetCode: { type: hashedCode },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  birthDate: birthDateSchema,
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 254,
  },
  profileImage: { type: String, required: false },
  phoneNumber: { type: Number, required: true, unique: true },
  gender: { type: String, required: false },
  notifications: { type: String, required: false },
  documents: [
    {
      propertyId: { type: 'ObjectId', ref: 'Property' },
      document: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
  password: { type: String, required: true },
  address: { type: String, required: true },
  bids: [{ type: 'ObjectId', ref: 'Bid' }],

  accountCreationDate: {
    type: Date,
    required: false,
    default: Date.now,
  },

  verifiedEmail: { type: Boolean, default: false },
  role: {
    type: String,
    required: false,
  },
  banReason: {
    type: String,
    required: false,
  },

  warnReason: {
    type: String,
    required: false,
  },

  suspendReason: {
    type: String,
    required: false,
  },

  offerPresented: {
    type: String,
    required: false,
  },
  warnStrike: {
    default: 0,
    type: Number,
    required: false,
  },
  amountOfAcceptedBids: {
    default: 0,
    type: Number,
    required: false,
  },
  amountOfDeniedBids: {
    default: 0,
    type: Number,
    required: false,
  },
  favoriteProperties: [
    {
      type: 'ObjectId',
      ref: 'Property',
    },
  ],
  codes: { type: codes, required: false, default: {} },
});

module.exports = mongoose.model('User', userSchema);
