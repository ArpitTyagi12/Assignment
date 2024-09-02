import { configureStore } from "@reduxjs/toolkit";
import genreReducer from "./GenreSlice";
import FavoriteReducer from "./FavoriteSlice";
import UserReducer from ".//UserSlice";

export const store = configureStore({
  reducer: {
    genre: genreReducer,
    favorites: FavoriteReducer,
    user: UserReducer,
  },
});
