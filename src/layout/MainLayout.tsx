import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../views/login/LoginPage";
import Sidebar from "./Sidebar";
import HomepageRoutes from "./UserLayout";
import { useState, useEffect } from "react";
import UnauthorizedPage from "../views/login/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../views/admin/dashboard/ErrorPage";
import SignupPage from "../views/login/SignupPage";

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
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/admin/*" element={<Sidebar />} /> */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin/*" element={<Sidebar />} />
      </Route>
      <Route path="/user/*" element={<HomepageRoutes />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}
