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

export default function LayoutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admins" element={<ManageAdmins />} />
      <Route path="/admins/add-admin" element={<AddEditAdmin />} />
      <Route path="/admins/update-admin/:userId" element={<AddEditAdmin />} />
      <Route path="/products" element={<ManageProducts />} />
      <Route path="/products/add-product" element={<AddEditProductStepper />} />
      <Route
        path="/products/view-product/:productId"
        element={<ViewProduct />}
      />
      <Route
        path="/products/update-product/:productId"
        element={<AddEditProductStepper />}
      />
      <Route path="/categories" element={<ManageCategory />} />
      <Route path="/users" element={<ManageCustomers />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}
