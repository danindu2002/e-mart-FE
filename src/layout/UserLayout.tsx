import { Route, Routes } from "react-router-dom";
import TopBar from "../views/customer/TopBar";
import UserLayoutRoutes from "./UserLayoutRoutes";
import { useState } from "react";

export default function HomepageRoutes() {
  return (
    <>
      <TopBar />
      <UserLayoutRoutes />
    </>
  );
}
