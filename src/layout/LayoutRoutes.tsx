import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerTest from "../views/customer/HomePage";
import Dashboard from "../views/admin/dashboard/Dashboard";
import ManageProducts from "../views/admin/products/ManageProducts";
import ManageCustomers from "../views/admin/customers/ManageCustomers";
import ManageAdmins from "../views/admin/admins/ManageAdmins";
import AddEditAdmin from "../views/admin/admins/AddEditAdmin";
import Profile from "../views/admin/profile/AdminProfile";
import AddEditProduct from "../components/forms/AddEditProduct";
import ManageCategory from "../views/admin/category/ManageCategory";
import AddEditProductStepper from "../views/admin/products/AddEditProducts";
import ViewProduct from "../views/admin/products/ViewProduct";
import ViewProductDetails from "../views/admin/products/ViewProductDetails";

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
        element={<ViewProductDetails />}
      />
      <Route
        path="/products/update-product/:productId"
        element={<AddEditProductStepper />}
      />
      <Route path="/categories" element={<ManageCategory />} />
      <Route path="/users" element={<ManageCustomers />} />
    </Routes>
  );
}
