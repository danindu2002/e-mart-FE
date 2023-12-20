import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{
  user: any | null;
  login: () => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
