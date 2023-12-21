import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function DashboardLayoutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
