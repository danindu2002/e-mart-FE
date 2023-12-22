import { Route, Routes } from "react-router-dom";
import AdminRoutes from "../views/admin/admins/AdminRoutes";
import ManageCategory from "../views/admin/category/ManageCategory";
import ManageCustomers from "../views/admin/customers/ManageCustomers";
import DashboardRoutes from "../views/admin/dashboard/DashboardRoutes";
import ProductRoutes from "../views/admin/products/ProductRoutes";
import ProfileRoutes from "../views/admin/profile/ProfileRoutes";

export default function AdminLayoutRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<DashboardRoutes />} />
      <Route path="/profile/*" element={<ProfileRoutes />} />
      <Route path="/admins/*" element={<AdminRoutes />} />
      <Route path="/products/*" element={<ProductRoutes />} />
      <Route path="/categories" element={<ManageCategory />} />
      <Route path="/users" element={<ManageCustomers />} />
    </Routes>
  );
}
