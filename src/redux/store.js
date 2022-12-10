import { configureStore } from "@reduxjs/toolkit";
import list from "../Components/NewslistItem/news_slice";
import login from "../Components/TeacherLogin/login_slice";
import sidebar from "../Components/sidebar_slice";
import groups from "../Components/check_slice";
import attandance from "../Components/StudentList/student_slice";
import see from "../Components/see_slice";

export const store = configureStore({
  reducer: { list, login, sidebar, groups, attandance, see },
  devTools: process.env.NODE_ENV !== "production",
});
