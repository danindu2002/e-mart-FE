import { Route, Routes } from "react-router-dom";
import LoginPage from "../views/login/LoginPage";
import Sidebar from "./Sidebar";
import SignupPage from "../views/login/SignupPage";
import Homepage from "../views/customer/HomePage";
import ProtectedRoutes from "./ProtectedRoutes";
import ProductDetails from "../views/customer/ProductDetails";
import UserLayoutRoutes from "./UserLayoutRoutes";
import HomepageRoutes from "./UserLayout";

export default function MainLayout() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin/*" element={<Sidebar />} />
      <Route path="/user/*" element={<HomepageRoutes />} />
    </Routes>
  );
}
