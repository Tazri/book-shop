import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./profileSlice/profileSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileSlice.reducer,
    },
  });
};
