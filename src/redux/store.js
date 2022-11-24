import { configureStore } from "@reduxjs/toolkit";
import list from "../Components/NewslistItem/news_slice";
import login from "../Components/TeacherLogin/login_slice";

export const store = configureStore({
  reducer: {
    list: list,
    login: login,
  },
  devTools: process.env.NODE_ENV !== "production",
});
