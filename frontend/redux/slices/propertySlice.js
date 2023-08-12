import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  street: null,
  postcode: null,
  city: null,
  country: null,
  premiumInfo: null,
};

export const propertySlice = createSlice({
  name: "chosenProperty",
  initialState,
  reducers: {
    addProperty: (state, action) => {
      state.street = action.payload.street;
      state.postcode = action.payload.postcode;
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.premiumInfo = action.payload.premiumInfo;
    },
  },
});

export const { addProperty } = propertySlice.actions;

export default propertySlice.reducer;
