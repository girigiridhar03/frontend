import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivate = ({ children }) => {
  const adminToken = sessionStorage.getItem("token");

  if (!adminToken) {
    <Navigate to={"/admin/login"} />;
  }

  return children;
};

export default AdminPrivate;
