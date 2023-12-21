import { Route, Routes } from "react-router-dom";
import AddEditAdmin from "../views/admin/admins/AddEditAdmin";
import ManageAdmins from "../views/admin/admins/ManageAdmins";
import ManageCategory from "../views/admin/category/ManageCategory";
import ManageCustomers from "../views/admin/customers/ManageCustomers";
import Dashboard from "../views/admin/dashboard/Dashboard";
import AddEditProductStepper from "../views/admin/products/AddEditProducts";
import ManageProducts from "../views/admin/products/ManageProducts";
import ViewProduct from "../views/admin/products/ViewProduct";
import Profile from "../views/admin/profile/AdminProfile";
import ErrorPage from "../views/admin/dashboard/ErrorPage";
import DashboardRoutes from "../views/admin/dashboard/DashboardRoutes";
import ProfileRoutes from "../views/admin/profile/ProfileRoutes";
import AdminRoutes from "../views/admin/admins/AdminRoutes";
import ProductRoutes from "../views/admin/products/ProductRoutes";

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
