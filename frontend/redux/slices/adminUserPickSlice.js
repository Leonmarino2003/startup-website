import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

export const userAdminSlice = createSlice({
  name: "adminUserSlicePick",
  initialState,
  reducers: {
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
    cleanUserId: (state, action) => {
      state.userId = "";
    },
  },
});

export const { updateUserId, cleanUserId } = userAdminSlice.actions;

export default userAdminSlice.reducer;
