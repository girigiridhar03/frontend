import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivate = ({ children }) => {
  const adminToken = JSON.parse(sessionStorage.getItem("admintoken"));
  const role = JSON.parse(sessionStorage.getItem("adminrole"));


  if (!adminToken || role !== "admin") {
    return <Navigate to={"/admin/login"} />;
  }

  return children;
};

export default AdminPrivate;
