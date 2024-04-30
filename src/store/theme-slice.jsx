import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: localStorage.getItem("isDark") === null || localStorage.getItem("isDark") === "false" ? false : true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggelTheme(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
