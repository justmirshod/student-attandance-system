import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
  isStaticLoading: "",
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
    loginTeacher: (state, { payload }) => {
      state.data = payload;
    },
    logOutTeacher: (state) => {
      state.data = {};
    },
    clearData: (state) => {
      if (state.data.detail) {
        state.data = {};
      } else if (state.data.user) {
        delete state.data.access;
        delete state.data.refresh;
      }
    },
    setIsStaticLoading: (state, { payload }) => {
      state.isStaticLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = "error";
      });
  },
});

const { actions, reducer } = loginSlice;
export default reducer;
export const { loginTeacher, logOutTeacher, clearData, setIsStaticLoading } =
  actions;
