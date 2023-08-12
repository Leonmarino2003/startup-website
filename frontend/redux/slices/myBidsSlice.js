import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bidDetails: null,
  plotDetails: null,
  status: 1,
};

export const myBidsSlice = createSlice({
  name: "myBids",
  initialState,
  reducers: {
    populateBidDetails: (state, action) => {
      state.bidDetails = action.payload;
    },
    populatePlotDetails: (state, action) => {
      state.plotDetails = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { populateBidDetails, populatePlotDetails } = myBidsSlice.actions;

export default myBidsSlice.reducer;
