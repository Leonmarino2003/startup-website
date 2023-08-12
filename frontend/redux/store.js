import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./slices/mapSlice.js";
import bidReducer from "./slices/bidSlice.js";
import loginReducer from "./slices/loginSlice.js";
import userReducer from "./slices/userSlice";
import splashReducer from "./slices/splashSlice.js";
import menuReducer from "./slices/menuSlice.js";
import componentReducer from "./slices/componentSlice.js";
import chosenPropertyReducer from "./slices/propertySlice.js";
import myBidsReducer from "./slices/myBidsSlice";
import userDataSliceReducer from "./slices/adminOutputSlice";

import userAdminSliceReducer from "./slices/adminUserPickSlice.js";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    placeBid: bidReducer,
    login: loginReducer,
    user: userReducer,
    splash: splashReducer,
    menu: menuReducer,
    componentHandler: componentReducer,
    chosenProperty: chosenPropertyReducer,
    myBids: myBidsReducer,
    adminOutput: userDataSliceReducer,
    userAdminPick: userAdminSliceReducer,
  },
});
