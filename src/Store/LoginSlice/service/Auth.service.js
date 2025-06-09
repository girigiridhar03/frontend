import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:2345",
  withCredentials: true,
});

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
      console.log(res);
      console.log(res?.status, res?.data?.success);

      if (res?.status === 200 && res?.data?.success) {
        sessionStorage.setItem("token", JSON.stringify(res?.data?.accessToken));
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
