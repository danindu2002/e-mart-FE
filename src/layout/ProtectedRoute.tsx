import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }: any) => {
  // Retrieve user data from sessionStorage
  const storedUserData = sessionStorage.getItem("loggedUserData");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  const userRole = userData ? userData.role.toLowerCase() : null;
  console.log(userRole);

  // Check if the user has the required role
  const isAuthenticated = userRole === requiredRole;

  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate to="/unauthorized" replace />}
    </>
  );
};

export default ProtectedRoute;
