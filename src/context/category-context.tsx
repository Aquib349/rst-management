import {
  getCategory,
  deleteCategory,
  addCategory,
  updateCategory,
} from "@/services/api/category.service";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useTransition,
} from "react";
import type { Category } from "@/types/types";
import { formSchema } from "@/schema/category";
import { z } from "zod";

interface CategoryContextProps {
  category: Category[];
  isPending: boolean;
  delCategory: (categoryId: number) => void;
  addNewCategory: (values: z.infer<typeof formSchema>) => void;
  editCategory: (categoryId: number, data: any) => void;
}

export const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryContextProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [category, setCategory] = useState<Category[]>([]);
  const [isPending, startTransition] = useTransition();

  // function to get all category
  function getAllCategory() {
    startTransition(async () => {
      try {
        const response = await getCategory();
        if (response) setCategory(response);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    });
  }

  // Function to add a new category
  function addNewCategory(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await addCategory(values);
        getAllCategory();
      } catch (error) {
        console.error("Failed to add new category:", error);
      }
    });
  }

  // function to delete the category
  function delCategory(categoryId: number) {
    startTransition(async () => {
      try {
        await deleteCategory(categoryId);
        getAllCategory();
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    });
  }

  // function to edit the category
  function editCategory(categoryId: number, data: any) {
    startTransition(async () => {
      try {
        await updateCategory(categoryId, data);
        getAllCategory();
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    });
  }

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <CategoryContext.Provider
      value={{ category, isPending, delCategory, addNewCategory, editCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
