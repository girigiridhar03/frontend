import { createSlice } from "@reduxjs/toolkit";
import { orderDetails } from "./service/orders.service";

const initialState = {
  isLoading: false,
  error: null,
  orderDetailsData: {},
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orderDetailsData = payload;
        state.error = null;
      })
      .addCase(orderDetails.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default orderSlice.reducer;
