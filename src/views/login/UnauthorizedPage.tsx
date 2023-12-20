import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const handleLogout = () => {
    sessionStorage.clear();
    return <Navigate to="/" />;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to access this page.</p>
      <Link to="/" onClick={handleLogout}>
        Go Back to Login Page
      </Link>
    </div>
  );
}
