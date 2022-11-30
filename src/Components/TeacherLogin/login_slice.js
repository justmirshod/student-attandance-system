import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
  loggedIn: false,
  activeUser: "",
  userId: "",
  subjects: [],
};

export const login = createAsyncThunk(
  "login/loginTeacher",
  async ({ email, password }) => {
    return await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

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
    clearData: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = "error";
      });
  },
});

const { actions, reducer } = loginSlice;
export default reducer;
export const { loginTeacher, logOutTeacher, clearData } = actions;
