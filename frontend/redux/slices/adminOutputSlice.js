import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OutPutItems: "",
  Items: [],
};
export const adminOutputSlice = createSlice({
  name: "adminOutputData",
  initialState,
  reducers: {
    setTypeData(state, payload) {
      state.OutPutItems = payload;
    },

    setItemData(state, { payload }) {
      console.log("payload", payload);
      if (payload.properties != null) {
        state.Items = payload.properties.map((item) => {
          return { ...item, transformed: true };
        });
      } else if (payload.msg != null) {
        console.log(payload.msg);
        state.Items = payload.msg.map((item) => {
          return { ...item, transformed: true };
        });
      } else {
        state.Items = payload.map((item) => {
          return { ...item, transformed: true };
        });
      }
    },

    clearData(state) {
      state.OutPutItems = "";
      state.Items = [];
    },
  },
});

export const { setTypeData, setItemData, clearData } = adminOutputSlice.actions;
export default adminOutputSlice.reducer;
