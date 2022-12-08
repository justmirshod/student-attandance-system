import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  attandanceLoading: false,
  dateLoading: false,
  previuoslyCheckedStudentsLoading: false,
  students: [],
  attandanceId: [],
  previuoslyCheckedStudents: [],
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

export const defineAttandanceDate = createAsyncThunk(
  "attandance/date",
  async ({ date, token }) => {
    return await fetch(
      `http://127.0.0.1:8000/attendance/attendances/date/?day=${date}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const fetchPreviuoslyCheckedStudents = createAsyncThunk(
  "students/previuoslyChecked",
  async ({ groupId, token, attandanceId }) => {
    return await fetch(
      `http://127.0.0.1:8000//attendance/attendances/${attandanceId}/reports/?group=${groupId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const studentSlice = createSlice({
  name: "attandance",
  initialState,
  reducers: {
    clearStudents: (state) => {
      state.attandanceId = [];
      state.students = [];
      state.attandanceLoading = false;
      state.dateLoading = false;
      state.previuoslyCheckedStudents = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAttandance.pending, (state) => {
        state.attandanceLoading = true;
      })
      .addCase(postAttandance.fulfilled, (state, { payload }) => {
        state.attandanceLoading = false;
        if (payload[0]) {
          return state;
        } else {
          state.students.push(payload);
        }
        // state.students.push(payload);
      })
      .addCase(postAttandance.rejected, (state, { payload }) => {
        state.attandanceLoading = "error";
      })
      .addCase(defineAttandanceDate.pending, (state) => {
        state.dateLoading = true;
      })
      .addCase(defineAttandanceDate.fulfilled, (state, { payload }) => {
        state.attandanceId = payload;
        state.dateLoading = false;
      })
      .addCase(defineAttandanceDate.rejected, (state) => {
        state.dateLoading = "error";
      })
      .addCase(fetchPreviuoslyCheckedStudents.pending, (state) => {
        state.previuoslyCheckedStudentsLoading = true;
      })
      .addCase(
        fetchPreviuoslyCheckedStudents.fulfilled,
        (state, { payload }) => {
          state.previuoslyCheckedStudentsLoading = false;
          state.previuoslyCheckedStudents = payload;
        }
      )
      .addCase(fetchPreviuoslyCheckedStudents.rejected, (state) => {
        state.previuoslyCheckedStudentsLoading = "error";
      });
  },
});

export const { clearStudents } = studentSlice.actions;
export default studentSlice.reducer;
