import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homeSlice from "../features/homeSlice";

const rootReducer = combineReducers({
  isHomeSlice: homeSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.REACT_APP_API !== "production",
});

export { store };
