import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/login" }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If the user is not authenticated, redirect to login
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // If the user's role is not in the allowedRoles array, redirect to a "not authorized" page or login
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // If the user is authorized, render the children components
  return children;
};

export default ProtectedRoute;
