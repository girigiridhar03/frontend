import { createSlice } from "@reduxjs/toolkit";
import {
  assignOrderToAgent,
  getSingleOrderDetails,
  orderDetails,
  updateOrderStatus,
} from "./service/orders.service";

const initialState = {
  isLoading: false,
  error: null,
  orderDetailsData: {},
  singleOrder: {},
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
      })
      .addCase(getSingleOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleOrderDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleOrder = payload;
        state.error = null;
      })
      .addCase(getSingleOrderDetails.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(assignOrderToAgent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(assignOrderToAgent.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(assignOrderToAgent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default orderSlice.reducer;
