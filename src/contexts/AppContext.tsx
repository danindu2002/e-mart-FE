import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AppContext {
  cartProducts: number;
  setCartProducts: any;
  searchTerm: string;
  setSearchTerm: any;
  selectedCategory: any;
  setSelectedCategory: any;
}

export const AppContext = createContext<AppContext>({
  cartProducts: 0,
  setCartProducts: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  selectedCategory: null,
  setSelectedCategory: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log("Updated cart length", cartProducts);
    console.log("Search Term", searchTerm);
    console.log("Selected Category", selectedCategory);
  }, [cartProducts, searchTerm, selectedCategory]);

  const contextValues: AppContext = {
    cartProducts,
    setCartProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContext => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
