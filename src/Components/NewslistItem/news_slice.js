import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      name: "Mirshod",
      surname: "Murodov",
      group: "E-201",
      absence: ["English", "Math", "Python", "Logic", "smth"],
    },
  ],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data.push({ name: "Dilshod" });
    },
  },
});

const { actions, reducer } = listSlice;

export default reducer;
export const { increment } = actions;
