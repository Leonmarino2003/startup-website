import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sourceCache: [],
  plotlineChunkCache: [],
  plotlineChunk: {},
  placedPin: false,
  coords: {
    lat: null,
    lng: null,
  },
  address: {
    street: "",
    postcode: "",
    city: "",
    country: "",
  },
  showLayerChanger: false,
  registerPlotView: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    disableSource: (state, action) => {
      const index = state.sourceCache.indexOf(action.payload);
      state.sourceCache.splice(index, 1);
    },
    addSource: (state, action) => {
      state.sourceCache.splice(0, 0, action.payload);
    },
    removePlotLineChunk: (state, action) => {
      const index = state.plotlineChunkCache.indexOf(action.payload);
      state.plotlineChunkCache.splice(index, 1);
    },
    cachePlotlineChunks: (state, action) => {
      state.plotlineChunkCache.splice(0, 0, action.payload);
    },
    updatePlotlineChunk: (state, action) => {
      //const lng = action.payload.coords.lng.toString();
      //const lat = action.payload.coords.lat.toString();
      //const id = `${lng};${lat}`;

      const id = action.payload.boundsArray.join(";");

      const data = action.payload.filteredPlotlines;
      const newChunk = { id, data };

      state.plotlineChunk = newChunk;
    },
    showNewPin: (state, action) => {
      state.placedPin = action.payload;
    },
    updateCoordinates: (state, action) => {
      state.coords.lat = action.payload.coords.lat;
      state.coords.lng = action.payload.coords.lng;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    handleShowLayerChanger: (state, action) => {
      state.showLayerChanger = action.payload;
    },
    handlePlotView: (state, action) => {
      state.registerPlotView = action.payload;
    },
  },
});

export const {
  showNewPin,
  updateCoordinates,
  updateAddress,
  handleShowLayerChanger,
  handlePlotView,
  updatePlotlineChunk,
  cachePlotlineChunks,
  removePlotLineChunk,
  addSource,
  disableSource,
} = mapSlice.actions;
export default mapSlice.reducer;
