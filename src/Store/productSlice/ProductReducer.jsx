import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getCategories,
  getSingleProduct,
} from "./service/products.service";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  allelectronicsProduct: [],
  totalProducts: null,
  pagination: {},
  singleProduct: {},
};

const productReducer = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.categories = [];
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.categories = payload;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.categories = [];
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.allelectronicsProduct = [];
        state.totalProducts = null;
        state.pagination = {};
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.allelectronicsProduct = payload?.data;
        state.totalProducts = payload?.totalProducts;
        state.pagination = {
          totalProducts: payload?.totalProducts,
          totalPages: payload?.totalPages,
          currentPage: payload?.currentPage,
        };
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.allelectronicsProduct = [];
        state.totalProducts = null;
        state.pagination = {};
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.singleProduct = {};
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleProduct = payload;
        state.error = null;
      })
      .addCase(getSingleProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.singleProduct = {};
        state.error = payload;
      });
  },
});

export default productReducer.reducer;
