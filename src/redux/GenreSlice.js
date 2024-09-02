import { createSlice } from "@reduxjs/toolkit";

export const genreSlice = createSlice({
  name: "genre",
  initialState: {
    selectedGenre: null,
  },
  reducers: {
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
  },
});

export const { setSelectedGenre } = genreSlice.actions;

export default genreSlice.reducer;
