import API from "@/Store/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getCategories = createAsyncThunk(
  "categories",
  async (section, { rejectWithValue }) => {
    try {
      const response = await API.get(`/store/getcategories?section=${section}`);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "allProducts",
  async (rebody, { rejectWithValue }) => {
    const { section, category, page } = rebody;
    let url = `/store/getallproducts?section=${section}`;

    if (category) {
      url = url + `&category=${category}`;
    }

    if (page) {
      url = url + `&page=${page}`;
    }

    try {
      const response = await API.get(url);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk("singleProduct",async(productId,{rejectWithValue})=>{
  try {
    
    const response = await API.get(`/store/getSingleProduct/${productId}`);
    return response?.data?.data
  } catch (error) {
    toast(error?.response?.data?.message || "Something went wrong")
    rejectWithValue(error)
  }
})