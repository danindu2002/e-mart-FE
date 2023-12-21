import { Route, Routes } from "react-router-dom";
import AddEditProducts from "./AddEditProducts";
import ManageProducts from "./ManageProducts";
import ViewProduct from "./ViewProduct";

export default function ProductLayoutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ManageProducts />} />
      <Route path="/add-product" element={<AddEditProducts />} />
      <Route
        path="/view-product/:productId"
        element={<ViewProduct />}
      />
      <Route
        path="/update-product/:productId"
        element={<AddEditProducts />}
      />
    </Routes>
  );
}
