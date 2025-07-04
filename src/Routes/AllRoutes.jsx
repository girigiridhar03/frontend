import SinglePage from "@/components/SinglePage/SinglePage";
import AdminLayout from "@/Layout/AdminLayout";
import AgentLayout from "@/Layout/AgentLayout";
import MainLayout from "@/Layout/MainLayout";
import AddProduct from "@/Pages/AddProduct/AddProduct";
import Cart from "@/Pages/Cart/Cart";
import Dashboard from "@/Pages/Dashboard/Dashboard";
import Electronics from "@/Pages/Electronics/Electronics";
import Home from "@/Pages/Home/Home";
import AdminLogin from "@/Pages/Logins/AdminLogin";
import AgentLogin from "@/Pages/Logins/AgentLogin";
import UserLogin from "@/Pages/Logins/UserLogin";
import Orders from "@/Pages/Orders/Orders";
import SingleOrder from "@/Pages/Orders/SingleOrder";
import ProductDetails from "@/Pages/ProductDetails/ProductDetails";
import SingleProductAdmin from "@/Pages/ProductDetails/SingleProductAdmin";
import SingleUserDetails from "@/Pages/SingleUserDetails/SingleUserDetails";
import Users from "@/Pages/Users/Users";
import AdminPrivate from "@/Private/AdminPrivate";
import ClientPrivate from "@/Private/ClientPrivate";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <Routes>
      {/* MainLayout */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <ClientPrivate>
              <Home />
            </ClientPrivate>
          }
        />
        <Route
          path="/electronics"
          element={
            <ClientPrivate>
              <Electronics />
            </ClientPrivate>
          }
        />
        <Route path="/electronics/:id" element={<SinglePage />} />
        <Route
          path="/cart"
          element={
            <ClientPrivate>
              <Cart></Cart>
            </ClientPrivate>
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserLogin />} />
      </Route>

      {/* AdminLayout */}
      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivate>
              <Dashboard />
            </AdminPrivate>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminPrivate>
              <Orders />
            </AdminPrivate>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <AdminPrivate>
              <SingleOrder />
            </AdminPrivate>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminPrivate>
              <Users />
            </AdminPrivate>
          }
        />
        <Route
          path="/admin/addproduct"
          element={
            <AdminPrivate>
              <AddProduct />
            </AdminPrivate>
          }
        />
        <Route
          path="/admin/productdetails"
          element={
            <AdminPrivate>
              <ProductDetails />
            </AdminPrivate>
          }
        />
        <Route
          path="/admin/singleproduct/:id"
          element={
            <AdminPrivate>
              <SingleProductAdmin />
            </AdminPrivate>
          }
        />
        <Route
          path="/admin/singleuserdetails/:id/:role"
          element={
            <AdminPrivate>
              <SingleUserDetails />
            </AdminPrivate>
          }
        />
      </Route>

      {/* AgentLayout */}
      <Route element={<AgentLayout />}>
        <Route path="/agent/login" element={<AgentLogin />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AllRoutes;
