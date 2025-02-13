import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useTransition,
} from "react";
import type { Menu } from "@/admin/types/types";
import { formSchema } from "@/admin/schema/menu";
import { z } from "zod";
import {
  addMenu,
  deleteMenu,
  getMenu,
  getSingleMenu,
  updateMenu,
} from "@/admin/services/api/menu.service";

interface MenuContextProps {
  menu: Menu[];
  SingleMenu: any;
  isPending: boolean;
  getOneMenu: (menuId: number) => void;
  delMenu: (menuId: number) => void;
  addNewMenu: (values: z.infer<typeof formSchema>) => void;
  editMenu: (menuId: number, data: any) => void;
  filterMenu: (filterText: string) => void;
}

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined
);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuContextProvider: React.FC<MenuProviderProps> = ({
  children,
}) => {
  const [allMenu, setAllMenu] = useState<Menu[]>([]);
  const [menu, setMenu] = useState<Menu[]>([]);
  const [SingleMenu, setSingleMenu] = useState<Menu[]>([]);
  const [isPending, startTransition] = useTransition();

  // function to get all menu
  function getAllMenu() {
    startTransition(async () => {
      try {
        const response = await getMenu();
        if (response) {
          setMenu(response);
          setAllMenu(response);
        }
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    });
  }

  // function to get one menu
  function getOneMenu(menuId: number) {
    startTransition(async () => {
      try {
        const response = await getSingleMenu(menuId);
        if (response) setSingleMenu(response);
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    });
  }

  // Function to add a new menu
  function addNewMenu(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await addMenu(values);
        getAllMenu();
      } catch (error) {
        console.error("Failed to add new menu :", error);
      }
    });
  }

  // function to delete the menu
  function delMenu(menuId: number) {
    startTransition(async () => {
      try {
        await deleteMenu(menuId);
        getAllMenu();
      } catch (error) {
        console.error("Failed to delete menu:", error);
      }
    });
  }

  // function to edit the menu
  function editMenu(menuId: number, data: any) {
    startTransition(async () => {
      try {
        await updateMenu(menuId, data);
        getAllMenu();
      } catch (error) {
        console.error("Failed to update menu:", error);
      }
    });
  }

  // function to filter category based on category names
  function filterMenu(filterText: string) {
    if (!filterText.trim()) {
      setMenu(allMenu);
      return;
    }

    const filteredCategory = menu.filter((item) =>
      item.menuName.toLowerCase().includes(filterText.toLowerCase())
    );

    setMenu(filteredCategory);
  }

  useEffect(() => {
    getAllMenu();
  }, []);
  return (
    <MenuContext.Provider
      value={{
        menu,
        SingleMenu,
        isPending,
        getOneMenu,
        delMenu,
        addNewMenu,
        editMenu,
        filterMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
