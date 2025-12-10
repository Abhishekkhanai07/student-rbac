import React, { createContext, useContext, useEffect, useState } from "react";
import { storage } from "@/services/storageService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get("authUser"));

  useEffect(() => {
    const handler = () => setUser(storage.get("authUser"));
    window.addEventListener("localUpdate", handler);
    return () => window.removeEventListener("localUpdate", handler);
  }, []);

  function login(email, password) {
    const users = storage.get("users") || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { error: "Invalid credentials" };
    const authUser = { id: found.id, role: found.role, email: found.email, name: found.name };
    storage.set("authUser", authUser);
    setUser(authUser);
    return { user: authUser };
  }

  function logout() {
    localStorage.removeItem("authUser");
    window.dispatchEvent(new CustomEvent("localUpdate", { detail: { key: "authUser" } }));
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
