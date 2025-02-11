import { del, get, post, put } from "../utils/apiHelper";
import type { Menu } from "@/types/types";

// Get all categories
export const getMenu = async (): Promise<Menu[] | null> => {
  try {
    const response = await get<Menu[]>("/v1/menu");
    return response;
  } catch (error) {
    console.error("Error fetching menus :", error);
    return null;
  }
};

// get single menu details
export const getSingleMenu = async (menuId: number): Promise<Menu[] | null> => {
  try {
    const response = await get<Menu[]>(`/v1/menu/${menuId}`);
    return response;
  } catch (error) {
    console.error("Error fetching menu :", error);
    return null;
  }
};

// add new categories
export const addMenu = async (data: any) => {
  try {
    const response = await post<{ message: string }>("/v1/menu/add", data);
    return response;
  } catch (error) {
    console.error("Error while adding menus :", error);
    return null;
  }
};

// update the existing category
export const updateMenu = async (menuId: number, data: any) => {
  try {
    const response = await put<{ message: string }>(
      `/v1/menu/update/${menuId}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error while updating menus :", error);
    return null;
  }
};

// delete the exsiting category
export const deleteMenu = async (menuId: number) => {
  try {
    const response = await del<{ message: string }>(
      `/v1/menu/delete/${menuId}`
    );
    return response;
  } catch (error) {
    console.error("Error while deleting the menu :", error);
    return null;
  }
};
