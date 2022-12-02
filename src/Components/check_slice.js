import dayjs from "dayjs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const date = new Date();

const validDate = (item) => {
  if (item.length === 1) {
    return "0" + item;
  } else {
    return item;
  }
};

const currentDate = `${validDate(date.getFullYear().toString())}-${validDate(
  (date.getMonth() + 1).toString()
)}-${validDate(date.getDate().toString())}`;

const initialState = {
  groups: {},
  activeGroupId: "",
  activeSubject: "",
  isLoading: false,
  activeDate: currentDate,
};

export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async ({ id, token }) => {
    return await fetch(
      `http://127.0.0.1:8000/accounts/teachers/${id}/subjects/`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((groups) => groups);
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setActiveSubject: (state, { payload }) => {
      state.activeSubject = payload;
      state.activeGroupId = "";
      state.activeDate = currentDate;
    },
    setActiveGroup: (state, { payload }) => {
      state.activeGroupId = payload;
    },
    setActiveDate: (state, { payload }) => {
      state.activeDate = payload;
    },
    resetActiveDate: (state) => {
      state.activeDate = currentDate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, { payload }) => {
        state.groups = payload;
        state.isLoading = false;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.isLoading = "error";
      });
  },
});

export const {
  setActiveGroup,
  setActiveSubject,
  setActiveDate,
  resetActiveDate,
} = groupSlice.actions;
export default groupSlice.reducer;
