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
  createAttendanceLoading: false,
  fetchStudentsLoading: false,
  fetchGroupsLoading: false,
  addExtraDataLoading: false,
  groups: {},
  activeGroupId: "",
  activeSubject: "",
  activeDate: currentDate,
  attandance: {},
  students: {},
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

export const createAttandance = createAsyncThunk(
  "attandance/create",
  async ({ subjectId, date, token }) => {
    return await fetch("http://127.0.0.1:8000/attendance/attendances/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        subject: subjectId,
        date,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async ({ groupId, token }) => {
    return await fetch(
      `http://127.0.0.1:8000/attendance/groups/${groupId}/students/`,
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

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setActiveSubject: (state, { payload }) => {
      state.activeSubject = payload;
      state.activeGroupId = "";
      state.activeDate = currentDate;
      state.attandance = {};
      state.students = {};
      state.fetchGroupsLoading = false;
      state.createAttendanceLoading = false;
      state.fetchStudentsLoading = false;
    },
    setActiveGroup: (state, { payload }) => {
      state.activeGroupId = payload;
      state.attandance = {};
      state.students = {};
      state.activeDate = currentDate;
      state.fetchGroupsLoading = false;
      state.createAttendanceLoading = false;
      state.fetchStudentsLoading = false;
    },
    setActiveDate: (state, { payload }) => {
      state.activeDate = payload;
    },
    resetActiveDate: (state) => {
      state.activeDate = currentDate;
    },
    clearAttandance: (state) => {
      state.attandance = {};
    },
    addExtraDataToExistStudens: (state, { payload }) => {
      state.addExtraDataLoading = true;
      state.students.results.filter(
        (item) => item.id === payload.id
      )[0].extraData = payload.data;
      state.addExtraDataLoading = false;
    },
    setExtraDataLoading: (state) => {
      state.addExtraDataLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.fetchGroupsLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, { payload }) => {
        state.groups = payload;
        state.fetchGroupsLoading = false;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.fetchGroupsLoading = "error";
      })
      .addCase(createAttandance.pending, (state) => {
        state.createAttendanceLoading = true;
      })
      .addCase(createAttandance.fulfilled, (state, { payload }) => {
        state.attandance = payload;
        state.createAttendanceLoading = false;
      })
      .addCase(createAttandance.rejected, (state) => {
        state.createAttendanceLoading = "error";
      })
      .addCase(fetchStudents.pending, (state) => {
        state.fetchStudentsLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, { payload }) => {
        state.students = payload;
        state.fetchStudentsLoading = false;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.fetchStudentsLoading = "error";
      });
  },
});

export const {
  setActiveGroup,
  setActiveSubject,
  setActiveDate,
  resetActiveDate,
  clearAttandance,
  addExtraDataToExistStudens,
  setExtraDataLoading,
} = groupSlice.actions;
export default groupSlice.reducer;
