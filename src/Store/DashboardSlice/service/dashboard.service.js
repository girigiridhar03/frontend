import API from "@/Store/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getUsersAndAgent = createAsyncThunk(
  "getusersagents",
  async (filter, { rejectWithValue }) => {
    try {
      let response = await API.get(
        `/auth/getallusersandagents?filterAuth=${filter}`
      );

      return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "getSingleuser",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/getsingleuser/${userid}`);

      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const agentDetails = createAsyncThunk(
  "agentDetails",
  async (agentId, { rejectWithValue }) => {
    try {
      let endPoint = "/order/agentorders";

      if (agentId) {
        endPoint = endPoint + `?agentid=${agentId}`;
      }

      const response = await API.get(endPoint);

      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
