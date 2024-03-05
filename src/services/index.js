import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducers";

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
