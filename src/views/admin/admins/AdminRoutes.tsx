import { Route, Routes } from "react-router-dom";
import AddEditAdmin from "./AddEditAdmin";
import ManageAdmins from "./ManageAdmins";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ManageAdmins />} />
      <Route path="/add-admin" element={<AddEditAdmin />} />
      <Route path="/update-admin/:userId" element={<AddEditAdmin />} />
    </Routes>
  );
}
