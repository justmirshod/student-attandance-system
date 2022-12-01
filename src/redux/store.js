import { configureStore } from "@reduxjs/toolkit";
import list from "../Components/NewslistItem/news_slice";
import login from "../Components/TeacherLogin/login_slice";
import sidebar from "../Components/sidebar_slice";
import groups from "../Components/check_slice";

export const store = configureStore({
  reducer: { list, login, sidebar, groups },
  devTools: process.env.NODE_ENV !== "production",
});
