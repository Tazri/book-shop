import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./profileSlice/profileSlice";
import { adminAuthSlice } from "./adminAuth/adminAuthSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileSlice.reducer,
      adminAuth: adminAuthSlice.reducer,
    },
  });
};
