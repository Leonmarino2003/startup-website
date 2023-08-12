import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loginPopup: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoginPopup: (state, action) => {
      state.loginPopup = action.payload;
    },
  },
});

export const { setIsLoggedIn, setLoginPopup } = loginSlice.actions;
export default loginSlice.reducer;
