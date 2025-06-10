import { createSlice } from "@reduxjs/toolkit";
import { login, refreshToken, register } from "./service/Auth.service";

const initialState = {
  isLoading: false,
  error: null,
};

const clientAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, { payload }) => {
        (state.isLoading = false), (state.error = payload);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        (state.isLoading = false), (state.error = payload);
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default clientAuthSlice.reducer;
