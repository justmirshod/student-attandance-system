import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  editStudentsLoading: false,
  students: [],
  activeGroupStudents: [],
  attandanceId: [],
  editingDateLoading: false,
  activeGroupStudentsLoading: "",
  checkedStudentsList: [],
  checkedStudentsListLoading: false,
  extraDataLoading: false,
};

export const editStudentAttandance = createAsyncThunk(
  "attandance/edit",
  async ({ reportId, token, status }) => {
    return await fetch(
      `http://127.0.0.1:8000/attendance/attendance-report/${reportId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const editingAttandanceDate = createAsyncThunk(
  "edit/defineDate",
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

export const seeCheckedStudentsList = createAsyncThunk(
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

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setExtraDataLoading: (state, { payload }) => {
      state.extraDataLoading = payload;
    },
    addExtraData: (state, { payload }) => {
      state.activeGroupStudents.results.filter(
        (item) => item.id === payload.id
      )[0].extraData = payload.data;
    },
    editStudent: (state, { payload }) => {
      state.activeGroupStudents.results.filter(
        (item) => item.id === payload.id
      )[0].extraData.status = payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editStudentAttandance.pending, (state) => {
        state.editStudentsLoading = true;
      })
      .addCase(editStudentAttandance.fulfilled, (state, { payload }) => {
        state.students.push(payload);
        state.editStudentsLoading = false;
      })
      .addCase(editingAttandanceDate.pending, (state) => {
        state.editingDateLoading = true;
      })
      .addCase(editingAttandanceDate.fulfilled, (state, { payload }) => {
        state.attandanceId = payload;
        state.editingDateLoading = false;
      })
      .addCase(fecthActiveGroupStudents.pending, (state) => {
        state.activeGroupStudentsLoading = true;
      })
      .addCase(fecthActiveGroupStudents.fulfilled, (state, { payload }) => {
        state.activeGroupStudents = payload;
        state.activeGroupStudentsLoading = false;
      })
      .addCase(seeCheckedStudentsList.pending, (state) => {
        state.checkedStudentsListLoading = true;
      })
      .addCase(seeCheckedStudentsList.fulfilled, (state, { payload }) => {
        state.checkedStudentsList = payload;
        state.checkedStudentsListLoading = false;
      });
  },
});

export const { addExtraData, setExtraDataLoading, editStudent } =
  updateSlice.actions;
export default updateSlice.reducer;
