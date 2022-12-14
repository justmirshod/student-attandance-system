import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [],
  isLoading: false,
};

export const fetchDailyAbsentStudents = createAsyncThunk(
  "fetch/dailyAbsense",
  async () => {
    return await fetch("");
  }
);
