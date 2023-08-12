import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayLeftDropdown: false,
  displayRightDropdown: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setDisplayLeftDropdown: (state, action) => {
      state.displayLeftDropdown = action.payload;
      state.displayRightDropdown = false;
    },
    setDisplayRightDropdown: (state, action) => {
      state.displayRightDropdown = action.payload;
      state.displayLeftDropdown = false;
    },
  },
});

export const { setDisplayLeftDropdown, setDisplayRightDropdown } =
  menuSlice.actions;
export default menuSlice.reducer;
