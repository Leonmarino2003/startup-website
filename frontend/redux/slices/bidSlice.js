import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayEmailNotice: false,
  postBid: false,
  displayEmailVerification: false,
  bid: {
    address: {},
    amount: null,
    user: "no user",
  },
};

export const bidSlice = createSlice({
  name: "placeBid",
  initialState,
  reducers: {
    shouldDisplayEmailNotice: (state, action) => {
      state.displayEmailNotice = action.payload;
    },
    shouldPostBid: (state, action) => {
      state.postBid = action.payload;
    },
    updateBid: (state, action) => {
      state.bid.address = action.payload.address;
      state.bid.amount = action.payload.bid;
    },
  },
});

export const { shouldDisplayEmailNotice, shouldPostBid, updateBid } =
  bidSlice.actions;

export default bidSlice.reducer;
