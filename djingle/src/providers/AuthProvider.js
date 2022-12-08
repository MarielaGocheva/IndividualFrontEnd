import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const redirectPathDJ = "/playlists/:userId";
  const redirectPathClient = "/client";
  const [user, setUser] = useState({
    position: "",
    permissions: []
  });
  const login = (user) => {
    console.log(user);
    if (user === "DJ") {
      setUser({ position: user, permissions: ["view_dj"] });
      navigate(redirectPathDJ, { replace: true });
    } else if(user === "CLIENT"){
      setUser({ position: user, permissions: ["view_client"] });
      navigate(redirectPathClient, {replace: true});
    }
    
  };
  const logout = () => {
    setUser({ position: "", permissions: [] });
    localStorage.removeItem('login_access_token');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};