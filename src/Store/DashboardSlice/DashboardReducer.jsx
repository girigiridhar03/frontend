import { createSlice } from "@reduxjs/toolkit";
import { getUsersAndAgent } from "./service/dashboard.service";

const initialState = {
  isLoading: false,
  error: null,
  usersandagent: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAndAgent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersAndAgent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.usersandagent = payload;
        state.error = null;
      })
      .addCase(getUsersAndAgent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.usersandagent = [];
        state.error = payload;
      });
  },
});

export default dashboardSlice.reducer;
