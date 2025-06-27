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
