import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addToCart,
  adminAddProduct,
  deleteCart,
  deleteComment,
  getAllProducts,
  getCartDetails,
  getCategories,
  getProductsByGroupId,
  getSingleProduct,
  updateCart,
} from "./service/products.service";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  allelectronicsProduct: [],
  totalProducts: null,
  pagination: {},
  singleProduct: {},
  getProductsByGrpId: [],
  cartDetails: {},
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
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getProductsByGroupId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.getProductsByGrpId = [];
      })
      .addCase(getProductsByGroupId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.getProductsByGrpId = payload;
      })
      .addCase(getProductsByGroupId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.getProductsByGrpId = null;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getCartDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.cartDetails = {};
      })
      .addCase(getCartDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.cartDetails = payload;
      })
      .addCase(getCartDetails.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.cartDetails = {};
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(adminAddProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminAddProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(adminAddProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;  
      });
  },
});

export default productReducer.reducer;
