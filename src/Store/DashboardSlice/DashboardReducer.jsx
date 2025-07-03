import { createSlice } from "@reduxjs/toolkit";
import {
  agentDetails,
  getSingleUser,
  getUsersAndAgent,
} from "./service/dashboard.service";

const initialState = {
  isLoading: false,
  error: null,
  usersandagent: [],
  getsingleuser: {},
  getSingleAgent: {},
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
      })
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.getsingleuser = payload;
        state.error = null;
      })
      .addCase(getSingleUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(agentDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(agentDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.getSingleAgent = payload;
        state.error = null;
      })
      .addCase(agentDetails.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default dashboardSlice.reducer;
