import API from "@/Store/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const orderDetails = createAsyncThunk(
  "orderDetails",
  async (queries, { rejectWithValue }) => {
    try {
      let { status, location, page, limit } = queries;

      let endPoint = `/order/allOrderDetails?page=${page}&limit=${limit}`;

      if (status) {
        endPoint = endPoint + `&status=${status}`;
      }

      if (location) {
        endPoint = endPoint + `&location=${location}`;
      }

      const response = await API.get(endPoint);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
