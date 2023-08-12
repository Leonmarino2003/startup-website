import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en-GB",
  fullName: "",
  name: {
    firstName: "",
    lastName: "",
  },
  currency: "SEK",
  profileImage: null,
  birthDate: {
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  },
  email: "",
  phoneNumber: "",
  gender: "",
  address: "",
  notifications: "",
  message: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    handleFullName: (state, action) => {
      state.fullName = action.payload.fullName;
    },
    handleName: (state, action) => {
      state.name.firstName =
        action.payload.formFirstName || action.payload.firstName;
      state.name.lastName =
        action.payload.formLastName || action.payload.lastName;
    },
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
    handleProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    handleBirthDate: (state, action) => {
      state.birthDate.birthDay =
        action.payload.formBirthDay || action.payload.birthDay;
      state.birthDate.birthMonth =
        action.payload.formBirthMonth || action.payload.birthMonth;
      state.birthDate.birthYear =
        action.payload.formBirthYear || action.payload.birthYear;
    },
    handleEmail: (state, action) => {
      state.email = action.payload.formEmail || action.payload.email;
    },
    handleAddress: (state, action) => {
      state.address = action.payload.formAddress || action.payload.address;
    },
    handlePhoneNumber: (state, action) => {
      state.phoneNumber =
        action.payload.formPhoneNumber || action.payload.phoneNumber;
    },
    handleGender: (state, action) => {
      state.gender = action.payload.formGender || action.payload.gender;
    },
    handleNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    handleMessages: (state, action) => {
      state.messages = action.payload;
    },
    setRole(state, { payload }) {
      state.role = payload;
    },
    setEmail(state, { payload }) {
      state.email = payload;
    },
  },
});

export const {
  changeLanguage,
  changeCurrency,
  handleFullName,
  handleName,
  handleProfileImage,
  handleBirthDate,
  handleEmail,
  handlePhoneNumber,
  handleGender,
  handleAddress,
  handleNotifications,
  handleMessages,
  resetUser,
  setRole,
  setEmail,
} = userSlice.actions;
export default userSlice.reducer;
