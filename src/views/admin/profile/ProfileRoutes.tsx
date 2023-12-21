import { Route, Routes } from "react-router-dom";
import AdminProfile from "./AdminProfile";

export default function ProfileLayoutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminProfile />} />
    </Routes>
  );
}
