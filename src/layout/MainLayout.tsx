import { Route, Routes } from "react-router-dom";
import LoginPage from "../views/login/LoginPage";
import SignupPage from "../views/login/SignupPage";
import Sidebar from "./Sidebar";
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
