import { configureStore } from "@reduxjs/toolkit";
import list from "../Components/NewslistItem/news_slice";

export const store = configureStore({
  reducer: { list },
  devTools: process.env.NODE_ENV !== "production",
});
