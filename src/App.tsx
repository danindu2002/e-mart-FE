import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "./theme";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { AuthProvider } from "./contexts/AuthContext";

const Toast = (
  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
);

interface AppContext {
  cartProducts: number;
  setCartProducts: any;
  searchTerm: string;
  setSearchTerm: any;
  selectedCategory: any;
  setSelectedCategory: any;
}

export const Context = createContext<AppContext>({
  cartProducts: 0,
  setCartProducts: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  selectedCategory: null,
  setSelectedCategory: () => {},
});

export default function App() {
  const [cartProducts, setCartProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log("Updated cart length", cartProducts);
    console.log("Search Term", searchTerm);
    console.log("Selected Category", selectedCategory);
  }, [cartProducts, searchTerm, selectedCategory]);

  const contextValues = {
    cartProducts,
    setCartProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={contextValues}>
        <AuthProvider>
          <BrowserRouter>
            <MainLayout />
          </BrowserRouter>
        </AuthProvider>
      </Context.Provider>
      {Toast}
    </ThemeProvider>
  );
}
