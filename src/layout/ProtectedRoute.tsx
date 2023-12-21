import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }: any) => {
  // Retrieve user data from sessionStorage
  const storedUserData = sessionStorage.getItem("loggedUserData");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  const userRole = userData ? userData.role : null;
  console.log(userRole);

  // Check if the user has the required role
  const isAuthenticated = userRole === requiredRole;

  // if (!isAuthenticated) {
  //   // If not authenticated, redirect to the unauthorized page
  //   return <Navigate to="/unauthorized" />;
  // }
  // return <Route element={element} />;

  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate to="/unauthorized" replace />}
    </>
  );
};

export default ProtectedRoute;
