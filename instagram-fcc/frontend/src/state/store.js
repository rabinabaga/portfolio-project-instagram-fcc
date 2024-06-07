import { configureStore } from "@reduxjs/toolkit";
import profilePrivacyReducer from "./profile-privacy/profilePrivacySlice"
import getMovieDetailReducer from "./getMovieDetail/getMovieDetailSlice"

export const store = configureStore({
  reducer: {
    profilePrivacy: profilePrivacyReducer,
    movieDetail:getMovieDetailReducer
  },
});
