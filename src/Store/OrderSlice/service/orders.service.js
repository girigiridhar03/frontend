import API from "@/Store/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

export const getSingleOrderDetails = createAsyncThunk(
  "singleOrder",
  async (orderid, { rejectWithValue }) => {
    try {
      const response = await API.get(`/order/getsingleorder/${orderid}`);

      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "updateStatus",
  async (reqBody, { rejectWithValue }) => {
    const { orderId, status } = reqBody;
    try {
      const response = await API.put(`/order/updateStatus/${orderId}`, {
        status: status,
      });

      toast.success(response?.data?.message);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const assignOrderToAgent = createAsyncThunk(
  "assignOrder",
  async (reqBody, { rejectWithValue }) => {
    const { orderId, agentId } = reqBody;
    console.log(reqBody);
    try {
      const response = await API.post(`/order/assignordertoagent/${orderId}`, {
        agentId: agentId,
      });

      console.log(response);

      toast.success(response?.data?.message);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
