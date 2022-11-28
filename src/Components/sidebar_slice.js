import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  show: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    showContent: (state) => {
      state.show = true;
    },
    hideContent: (state) => {
      state.show = false;
    },
    toggleContent: (state) => {
      state.show = !state.show;
    },
  },
});

const { actions, reducer } = sidebarSlice;

export default reducer;
export const { showContent, hideContent, toggleContent } = actions;
