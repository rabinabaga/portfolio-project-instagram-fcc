import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  privacy: "public",
};

const profilePrivacySlice = createSlice({
  name: "profilePrivacy",
  initialState,
  reducers: {
    togglePrivacy: (state) => {
      if (state.privacy === "public") state.privacy = "private";
      else state.privacy = "public";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(togglePrivacyAsync.pending, () => {
        console.log("profile privacy pending");
      })
      .addCase(togglePrivacyAsync.fulfilled, (state, action) => {
        if (state.privacy === "public") state.privacy = "private";
        else state.privacy = "public";
      });
  },
});

export const togglePrivacyAsync = createAsyncThunk(
  "profilePrivacy/togglePrivacyAsync",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;
  }
);
export const { togglePrivacy } = profilePrivacySlice.actions;

export default profilePrivacySlice.reducer;
