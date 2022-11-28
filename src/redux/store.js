import { configureStore } from "@reduxjs/toolkit";
import list from "../Components/NewslistItem/news_slice";
import login from "../Components/TeacherLogin/login_slice";
import sidebar from "../Components/sidebar_slice";

export const store = configureStore({
  reducer: { list, login, sidebar },
  devTools: process.env.NODE_ENV !== "production",
});
