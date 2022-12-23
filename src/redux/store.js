import { configureStore } from "@reduxjs/toolkit";
import login from "../Components/TeacherLogin/login_slice";
import sidebar from "../Components/sidebar_slice";
import groups from "../Components/check_slice";
import attandance from "../Components/StudentList/student_slice";
import see from "../Components/see_slice";
import update from "../Components/edit_slice";
import history from "../Pages/OneStudentStatus/studentHistory_slice";
import pagination from "../Components/Pagination/pagination_slice";

export const store = configureStore({
  reducer: {
    login,
    sidebar,
    groups,
    attandance,
    see,
    update,
    history,
    pagination,
  },
  devTools: process.env.NODE_ENV !== "production",
});
