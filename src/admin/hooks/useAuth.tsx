import { AuthContext } from "@/admin/context/auth-context";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context must be within auth provider");
  }

  return context;
};
