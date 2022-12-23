import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  seeDateLoading: false,
  studentAttandanceLoading: false,
  seeStudentList: [],
  attandanceId: [],
  activeGroupStudents: [],
  allStudentsLoading: "",
  addExtraDataLoading: false,
};

export const fecthSeenStudents = createAsyncThunk(
  "see/studentsAttandance",
  async ({ attandanceId, groupId, token }) => {
    return await fetch(
      `http://127.0.0.1:8000/attendance/attendances/${attandanceId}/reports/?group=${groupId}&page_size=30`,
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

export const fetchAttandanceDate = createAsyncThunk(
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

export const fecthActiveGroupStudents = createAsyncThunk(
  "students/fetch",
  async ({ groupId, token }) => {
    return await fetch(
      `http://127.0.0.1:8000/attendance/groups/${groupId}/students/?page_size=30`,
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

export const seeSlice = createSlice({
  name: "see",
  initialState,
  reducers: {
    clearSeeAttandance: (state) => {
      state.seeStudentList = [];
      state.attandanceId = [];
      state.activeGroupStudents = [];
      state.seeDateLoading = false;
      state.studentAttandanceLoading = false;
      state.allStudentsLoading = "";
    },
    addExtraData: (state, { payload }) => {
      state.activeGroupStudents.results.filter(
        (item) => item.id === payload.id
      )[0].extraData = payload.data;
    },
    setExtraDataLoading: (state, { payload }) => {
      state.addExtraDataLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthSeenStudents.pending, (state) => {
        state.studentAttandanceLoading = true;
      })
      .addCase(fecthSeenStudents.fulfilled, (state, { payload }) => {
        state.seeStudentList = payload;
        state.studentAttandanceLoading = false;
      })
      .addCase(fecthSeenStudents.rejected, (state) => {
        state.studentAttandanceLoading = "error";
      })
      .addCase(fetchAttandanceDate.pending, (state) => {
        state.seeDateLoading = true;
      })
      .addCase(fetchAttandanceDate.fulfilled, (state, { payload }) => {
        state.attandanceId = payload;
        state.seeDateLoading = false;
      })
      .addCase(fetchAttandanceDate.rejected, (state) => {
        state.seeDateLoading = "error";
      })
      .addCase(fecthActiveGroupStudents.pending, (state) => {
        state.allStudentsLoading = true;
      })
      .addCase(fecthActiveGroupStudents.fulfilled, (state, { payload }) => {
        state.activeGroupStudents = payload;
        state.allStudentsLoading = false;
      })
      .addCase(fecthActiveGroupStudents.rejected, (state) => {
        state.allStudentsLoading = "error";
      });
  },
});

export const { clearSeeAttandance, addExtraData, setExtraDataLoading } =
  seeSlice.actions;
export default seeSlice.reducer;
