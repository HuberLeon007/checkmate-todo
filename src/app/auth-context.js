"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try to load user from localStorage
    const stored = localStorage.getItem("checkmate-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("checkmate-user", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("checkmate-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
