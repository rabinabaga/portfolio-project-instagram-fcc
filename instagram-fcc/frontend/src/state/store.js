import { configureStore } from "@reduxjs/toolkit";
import profilePrivacyReducer from "./profile-privacy/profilePrivacySlice"

export const store = configureStore({
  reducer: {
    profilePrivacy: profilePrivacyReducer
  },
});
