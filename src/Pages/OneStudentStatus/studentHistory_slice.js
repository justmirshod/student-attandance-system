import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentHistory: [],
  loadingStudentHistory: false,
};

export const studentAttandanceHistory = createAsyncThunk(
  "fetch/studentHistory",
  async ({ token, studentId }) => {
    return await fetch(
      `http://127.0.0.1:8000/attendance/students/${studentId}/attendances/`
    )
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(studentAttandanceHistory.pending, (state) => {
        state.loadingStudentHistory = true;
      })
      .addCase(studentAttandanceHistory.fulfilled, (state, { payload }) => {
        state.studentHistory = payload;
        state.loadingStudentHistory = false;
      });
  },
});

export const {} = historySlice.actions;
export default historySlice.reducer;
