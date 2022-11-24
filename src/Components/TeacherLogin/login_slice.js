import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  activeUser: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginTeacher: (state, action) => {
      state.loggedIn = true;
      state.activeUser = action.payload;
    },
    logOutTeacher: (state) => {
      state.loggedIn = false;
      state.activeUser = "";
    },
  },
});

const { actions, reducer } = loginSlice;
export default reducer;
export const { loginTeacher, logOutTeacher } = actions;
