import React from "react";
import { Navigate } from "react-router-dom";

const ClientPrivate = ({ children }) => {

  const token = JSON.parse(sessionStorage.getItem("token"));

  if(!token){
    return <Navigate to={"/login"} />
  }

  return children;
};

export default ClientPrivate;
