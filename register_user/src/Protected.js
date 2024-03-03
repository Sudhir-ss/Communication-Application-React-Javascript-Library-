import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    return <Navigate to="/Homepage" replace={true}></Navigate>;
  }

  return children;
};

export default Protected;