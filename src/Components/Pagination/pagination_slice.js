import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  data: {},
  isDataLoading: false,
};

export const fetchStudentsOnPageChange = createAsyncThunk(
  "fetch/studentsOnPageChange",
  async ({ token, groupId, attandanceId, activePage }) => {
    return await fetch(
      `http://127.0.0.1:8000/attendance/attendances/${attandanceId}/reports/?group=${groupId}&page=${
        activePage + 1
      }`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.json)
      .then((data) => data);
  }
);

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsOnPageChange.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchStudentsOnPageChange, (state, { payload }) => {
        state.data = payload;
        state.isDataLoading = false;
      })
      .addCase(fetchStudentsOnPageChange.rejected, (state) => {
        state.isDataLoading = "error";
      });
  },
});

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
