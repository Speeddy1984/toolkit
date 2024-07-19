import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "64405bd2";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    // console.log(response.data.Search)
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "done";
        state.movies = action.payload.Search || [];
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
