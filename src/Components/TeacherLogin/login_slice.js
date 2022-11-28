import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  activeUser: "",
  userId: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginTeacher: (state, action) => {
      state.loggedIn = true;
      state.activeUser = action.payload.name;
      state.userId = action.payload.id;
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
