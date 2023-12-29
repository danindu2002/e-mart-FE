import { Route, Routes } from "react-router-dom";
import TopBar from "../views/customer/TopBar";
import UserLayoutRoutes from "./UserLayoutRoutes";
import { useState } from "react";
import { Box, Container } from "@mui/material";

export default function HomepageRoutes() {
  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <TopBar />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <UserLayoutRoutes />
      </Box>
    </Box>
  );
}
