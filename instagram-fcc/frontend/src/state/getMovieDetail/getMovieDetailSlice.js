import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movieDetail: null,
};

const getMovieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    togglePrivacy: (state) => {
      if (state.privacy === "public") state.privacy = "private";
      else state.privacy = "public";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieDetailAsync.pending, () => {
        console.log("get movie detail pending");
      })
      .addCase(getMovieDetailAsync.fulfilled, (state, action) => {
     state.movieDetail = action.payload;
      });
  },
});

export const getMovieDetailAsync = createAsyncThunk(
  "movieDetail/getMovieDetailyAsync",
  async () => {
  const response = await axios.get(
    "https://www.omdbapi.com/?apiKey=3c96e044&page=1&i=tt0372784"
  );
  console.log("response data", response);
  return response.data;
  }
);


export default getMovieDetailSlice.reducer;
