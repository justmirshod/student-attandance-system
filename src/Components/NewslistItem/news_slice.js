import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      name: "Mirshod",
      surname: "Murodov",
      group: "E-201",
      absence: [
        "English for beginners It specialists",
        "Math",
        "Python",
        "Logic",
        "smth",
      ],
    },
    {
      name: "Dilshod",
      surname: "Adizov",
      group: "E-203",
      absence: ["Math"],
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
