import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: {},
  activeGroup: "",
  activeSubject: "",
  isLoading: false,
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
      if (payload === "default") {
        state.activeSubject = "";
        return;
      }
      state.activeSubject = payload;
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

export const { setActiveGroup, setActiveSubject } = groupSlice.actions;
export default groupSlice.reducer;
