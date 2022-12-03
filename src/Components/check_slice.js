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
  isLoading1: "",
  isLoading2: "",
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
    },
    setActiveGroup: (state, { payload }) => {
      state.activeGroupId = payload;
      state.attandance = {};
      state.students = {};
      state.activeDate = currentDate;
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
      })
      .addCase(createAttandance.pending, (state) => {
        state.isLoading1 = true;
      })
      .addCase(createAttandance.fulfilled, (state, { payload }) => {
        state.attandance = payload;
        state.isLoading1 = false;
      })
      .addCase(createAttandance.rejected, (state) => {
        state.isLoading1 = "error";
      })
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading2 = true;
      })
      .addCase(fetchStudents.fulfilled, (state, { payload }) => {
        state.students = payload;
        state.isLoading2 = true;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.isLoading2 = "error";
      });
  },
});

export const {
  setActiveGroup,
  setActiveSubject,
  setActiveDate,
  resetActiveDate,
  clearAttandance,
} = groupSlice.actions;
export default groupSlice.reducer;
