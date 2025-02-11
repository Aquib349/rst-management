import { MenuContext } from "@/context/menu-context";
import { useContext } from "react";

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("menu context must be within the menu provider");
  }

  return context;
};
