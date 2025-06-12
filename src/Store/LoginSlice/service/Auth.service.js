import API from "@/Store/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const register = createAsyncThunk(
  "register",
  async (formData, { rejectWithValue }) => {
    try {
      const data = new FormData();

      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      if (formData.image) {
        data.append("image", formData.image);
      }
      const res = await API.post("/auth/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 201 && res?.data?.success) {
        toast.success(res?.data?.message);
        return res.data;
      } else {
        toast.error(res?.data?.message);
        return rejectWithValue(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (formData, { rejectWithValue }) => {
    try {
      let res = await API.post("/auth/login", formData);

      if (res?.status === 200 && res?.data?.success) {
        sessionStorage.setItem("token", JSON.stringify(res?.data?.accessToken));
        toast.success(res?.data?.message);
        return res.data;
      } else if (res?.status === 404) {
        toast.error("Access Expired.");
        sessionStorage.clear();
        return rejectWithValue(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
        sessionStorage.clear();
        return rejectWithValue(res?.data?.message);
      }
    } catch (error) {
      sessionStorage.clear();
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      let res = await API.get("/auth/refreshToken");

      if (res?.status === 200 && res?.data?.success) {
        sessionStorage.setItem("token", JSON.stringify(res?.data?.accessToken));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);
