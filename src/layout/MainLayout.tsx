import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../views/login/LoginPage";
import Sidebar from "./Sidebar";
import HomepageRoutes from "./UserLayout";
import { useState, useEffect } from "react";
import UnauthorizedPage from "../views/login/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";

export default function MainLayout() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("loggedUserData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserRole(userData.role);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin/*" element={<Sidebar />} />
      {/* <Route
        path="/admin/*"
        element={
          userRole === "Admin" ? (
            <Sidebar />
          ) : (
            <Navigate to="/unauthorized" replace />
          )
        }
      /> */}
      {/* <Route
        path="/admin/*"
        element={<ProtectedRoute element={<Sidebar />} requiredRole="Admin" />}
      /> */}
      <Route path="/user/*" element={<HomepageRoutes />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
}
