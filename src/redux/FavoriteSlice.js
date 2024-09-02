import { createSlice } from "@reduxjs/toolkit";

export const FavoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      return state.filter((favorite) => favorite.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = FavoriteSlice.actions;

export default FavoriteSlice.reducer;
