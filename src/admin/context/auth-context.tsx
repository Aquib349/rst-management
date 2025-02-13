import axiosInstance from "@/admin/services/utils/axiosInstance";
import React, { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (authToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );
  const navigate = useNavigate();

  // function for login
  const login = (authToken: string) => {
    localStorage.setItem("authToken", authToken);
    axiosInstance.defaults.headers.Authorization = `${authToken}`;
    setIsAuthenticated(true);
    navigate("/");
  };

  // function for logout
  const logout = () => {
    localStorage.removeItem("authToken");
    delete axiosInstance.defaults.headers.Authorization;
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext>
  );
};
