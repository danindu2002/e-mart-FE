import { Route, Routes } from "react-router-dom";
import ProductDetails from "../views/customer/ProductDetails";
import HomePage from "../views/customer/HomePage";
import Cart from "../views/customer/Cart";
import Profile from "../views/admin/profile/UserProfile";
import ErrorPage from "../views/admin/dashboard/ErrorPage";

export default function UserLayoutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product-details/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}
