import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import MainLayout from "./layout/MainLayout";
import { theme } from "./theme";

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
  profilePhoto: any;
  setProfilePhoto: any;
  searchTerm: string;
  setSearchTerm: any;
  selectedCategory: any;
  setSelectedCategory: any;
  userId: any;
  setUserId: any;
}

export const Context = createContext<AppContext>({
  cartProducts: 0,
  setCartProducts: () => {},
  profilePhoto: "",
  setProfilePhoto: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  selectedCategory: null,
  setSelectedCategory: () => {},
  userId: null,
  setUserId: () => {},
});

export default function App() {
  const [cartProducts, setCartProducts] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log("Updated cart length", cartProducts);
    console.log("Search Term", searchTerm);
    console.log("Selected Category", selectedCategory);
    console.log("ContextProfile Photo", profilePhoto);
  }, [cartProducts, searchTerm, selectedCategory]);

  useEffect(() => {
    if (profilePhoto) {
      const storedUserData = sessionStorage.getItem("loggedUserData");
      if (storedUserData) {
        let parsedUserData = JSON.parse(storedUserData as string);
        parsedUserData.profilePhoto = profilePhoto;
        sessionStorage.setItem(
          "loggedUserData",
          JSON.stringify(parsedUserData)
        );
        console.log("profilePhoto", profilePhoto);
      }
    }
  }, [profilePhoto]);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("loggedUserData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData as string);
      console.log("parsedUserData", parsedUserData);
      setProfilePhoto(parsedUserData?.profilePhoto);
      setUserId(parsedUserData?.userId);
    }
  }, []);

  const contextValues = {
    cartProducts,
    setCartProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    profilePhoto,
    setProfilePhoto,
    userId,
    setUserId,
  };

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={contextValues}>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </Context.Provider>
      {Toast}
    </ThemeProvider>
  );
}
