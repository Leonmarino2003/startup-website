import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displaySplashScreen: false,
  displayRegisterSplashScreen: false,
};

export const splashSlice = createSlice({
  name: "splash",
  initialState,
  reducers: {
    setDisplaySplashScreen: (state, action) => {
      state.displaySplashScreen = action.payload;
    },
  },
});

export const { setDisplaySplashScreen } = splashSlice.actions;
export default splashSlice.reducer;
