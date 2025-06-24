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
    const { section, category, page, limit } = rebody;
    let url = `/store/getallproducts?section=${section}&limit=${limit}`;

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

export const getSingleProduct = createAsyncThunk(
  "singleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/store/getSingleProduct/${productId}`);
      return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "deletecomment",
  async (reqBody, { rejectWithValue }) => {
    const { id, commentId } = reqBody;
    try {
      const response = await API.delete(
        `/store/deletecomment/${id}/${commentId}`
      );
      if (response?.status === 200 && response?.data?.success) {
        toast.success(response?.data?.message);
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "addcomment",
  async (reqBody, { rejectWithValue }) => {
    try {
      const { id, comment } = reqBody;
      const response = await API.post(`/store/addcomments/${id}`, {
        comment: comment,
      });

      if (response?.status === 200 && response?.data?.success) {
        toast.success(response?.data?.message);
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      rejectWithValue(error);
    }
  }
);

export const getProductsByGroupId = createAsyncThunk(
  "getProductsByGroupId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/store/getProductsByGroupId/${id}`);

      return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "addtocart",
  async (reqBody, { rejectWithValue }) => {
    try {
      const response = await API.post("/store/addtocart", reqBody);

      if (response?.status === 200 && response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      rejectWithValue(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "updateCart",
  async (reqBody, { rejectWithValue }) => {
    try {
      const response = await API.post("/store/updateCart", reqBody);

      if (response?.status === 200 && response?.data?.success) {
        toast.success("Cart Updated");
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      rejectWithValue(error);
    }
  }
);

export const getCartDetails = createAsyncThunk(
  "getCartDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/store/getcartdetails`);

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      rejectWithValue(error);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "deleteCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`store/deletecartitem/${id}`);
      if (response?.status === 200 && response?.data?.success) {
        toast.success(response?.data?.message);
      }
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      rejectWithValue(error);
    }
  }
);
