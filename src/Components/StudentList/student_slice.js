import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  attandanceLoading: false,
  students: {},
};

export const postAttandance = createAsyncThunk(
  "attandance/add",
  async ({ token, studentId, attandanceId, status }) => {
    return await fetch("http://127.0.0.1:8000/attendance/attendance-report/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        student: studentId,
        attendance: attandanceId,
        status,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const studentSlice = createSlice({
  name: "attandance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAttandance.pending, (state) => {
        state.attandanceLoading = true;
      })
      .addCase(postAttandance.fulfilled, (state, { payload }) => {
        state.students = payload;
        state.attandanceLoading = false;
      })
      .addCase(postAttandance.rejected, (state) => {
        state.attandanceLoading = "error";
      });
  },
});

export const {} = studentSlice.actions;
export default studentSlice.reducer;
