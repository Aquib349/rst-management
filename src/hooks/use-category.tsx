import { CategoryContext } from "@/context/category-context";
import { useContext } from "react";

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("category context must be within the category provider");
  }

  return context;
};
