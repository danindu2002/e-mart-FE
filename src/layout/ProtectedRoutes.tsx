import React from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "../views/login/LoginPage";

const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

export default function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <LoginPage />;
}
